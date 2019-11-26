const firestore = require('../services/firestore');

exports.products_list = function(req, res) {
    
    let products = new Array();
    firestore.collection('products').get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                products.push(doc.data());
            });
            res.send(products);
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
};

exports.productsHangs = async function(req, res) {
    hangs = await module.exports.getProductHangs();
    res.send(hangs);
}

exports.productsHangsByWarehouseByProduct = async function(req, res) {
    //console.log(req.params);
    hangs = await module.exports.getProductHangs();
    for(let i=0; i < hangs.length; ++i) {
        if(hangs[i].barcode!=req.params.barcode) {
            hangs.splice(i,1);
            --i;
        } else {
            for(let x=0; x < hangs[i].warehouses.length; ++x) {
                if(hangs[i].warehouses[x].warehouse_key!=req.params.warehouse) {
                    hangs[i].warehouses.splice(x,1);
                    --x;
                }
            }
        }
    }
    res.send(hangs);
}



module.exports.getProductHangs = async function() {
    // Getting All Orders
    const ordersController = require('../controllers/ordersController');
    let allOrders = await ordersController.ordersListAll();
    let hangs = new Array();

    allOrders.forEach(prod => {  
        let whIndex = 0; // Default warehouse Index.
        let index = hangs.findIndex(function(e) {
            if(e.barcode==prod.barcode) {
                return e;
            }
        });

        if(index == -1) {    
            hangs.push(getDefaultHangObj(prod,prod.warehouse_key));
            index = (hangs.length -1);
        } else {
            whIndex = hangs[index].warehouses.findIndex(function(e) {
                if(e.warehouse_key==prod.warehouse_key) {
                    return e;
                }
            });
            if(whIndex == -1) {
                hangs[index].warehouses.push(getDefaultWaregouseHangObj(prod.warehouse_key));
                whIndex = (hangs[index].warehouses.length -1);
            }
        }
        
        //Change stock based on the Order status
        if(prod.done==1) { // Done
            hangs[index].warehouses[whIndex].quantity_in_stock -= prod.quantity;
        } else if(prod.ready==1) { //Ready but not done.
            hangs[index].warehouses[whIndex].quantity_compromised -= prod.quantity;
        } else { // Not done, not ready.
            hangs[index].warehouses[whIndex].quantity_sold -= prod.quantity;
        }

    });

    //Getting all Movements
    const movementOrderController = require('./movementOrderController');
    let movOrders = await movementOrderController.getMovOrders();
    movOrders.forEach(movOrder => {
        let whSenderIndex=0;
        let whReceiverIndex=0;
        let index = hangs.findIndex(function(e) {
            if(e.barcode==movOrder.barcode) {
                return e;
            }
        });
        
        if(index == -1) {
            hangs.push(getDefaultHangObj(movOrder, movOrder.warehouse_receiver));
            index = (hangs.length -1);
            //Inserting the sender Warehouse (if exists)
            if(movOrder.warehouse_sender!==undefined && movOrder.warehouse_sender!="") {
                hangs[index].warehouses.push(getDefaultWaregouseHangObj(movOrder.warehouse_sender));
            }
            
        }
        
        //Looking for the Receiver (Always exists)
        whReceiverIndex = hangs[index].warehouses.findIndex(function(e) {
            if(e.warehouse_key==movOrder.warehouse_receiver) {
                return e;
            }
        });
        if(whReceiverIndex == -1) {
            hangs[index].warehouses.push(getDefaultWaregouseHangObj(movOrder.warehouse_receiver));
            whReceiverIndex = (hangs[index].warehouses.length -1);
        }          
        
        if(movOrder.received) {
            hangs[index].warehouses[whReceiverIndex].quantity_in_stock += movOrder.quantity;
        } else {
            hangs[index].warehouses[whReceiverIndex].quantity_future_movs += movOrder.quantity;
        }

        //Looking for the wh sender. (Not always (exceptions are the buys orders))
        if(movOrder.warehouse_sender!==undefined && movOrder.warehouse_sender!="") {
            whSenderIndex = hangs[index].warehouses.findIndex(function(e) {
                if(e.warehouse_key==movOrder.warehouse_sender) {
                    return e;
                }
            });
            if(whSenderIndex == -1) {
                hangs[index].warehouses.push(getDefaultWaregouseHangObj(movOrder.warehouse_sender));
                whSenderIndex = (hangs[index].warehouses.length -1);
            }
            if(movOrder.sent) {
                hangs[index].warehouses[whSenderIndex].quantity_in_stock -= movOrder.quantity;
            } else {
                hangs[index].warehouses[whSenderIndex].quantity_future_movs -= movOrder.quantity;
            }
        }
    });

    //Trying to ser orders to READY.
    jsonOrders = ordersController.MysqltoJson(allOrders);
    for(let order of jsonOrders) {
        if(order.ready==0) {
            let ready = true;
            // To save index positions and wh positions in case of ready :(
            let positions = {
                "index": new Array(),
                "warehouses": new Array(),
                "quantity": new Array()
            };

            for(let product of order.products) {
                //Gathering index on hangs
                let index = hangs.findIndex(function(e) {
                    if(e.barcode==product.barcode) {
                        return e;
                    }
                });
                //gathering wh index on product hang
                let whIndex = hangs[index].warehouses.findIndex(function(e) {
                    if(e.warehouse_key==order.warehouse_key) {
                        return e;
                    }
                });
                let freeQuantity = hangs[index].warehouses[whIndex].quantity_in_stock + 
                    hangs[index].warehouses[whIndex].quantity_compromised;
                if(product.quantity > freeQuantity) { // No enough stock.. go to next order
                    ready = false;
                    break;
                } else {
                    positions.index.push(index);
                    positions.warehouses.push(whIndex);
                    positions.quantity.push(product.quantity);
                }
            }
            if(ready) {
                
                if(await ordersController.setOrderReady(order.id)) {
                    for(let x=0; x < positions.index.length; ++x) {
                        hangs[positions.index[x]].warehouses[positions.warehouses[x]].quantity_compromised -= positions.quantity[x];
                        hangs[positions.index[x]].warehouses[positions.warehouses[x]].quantity_sold += positions.quantity[x];
                    }
                }

            }
        }
    };
    return hangs;
}

function getDefaultHangObj(orderProd,warehouse_key) {
    hang = new Object();
    hang.barcode = orderProd.barcode;
    hang.name = orderProd.name;
    hang.warehouses = new Array();
    hang.warehouses.push(getDefaultWaregouseHangObj(warehouse_key));
    return hang;
}

function getDefaultWaregouseHangObj(warehouse_key) {
    return defaultWarehouseSet = {
        "warehouse_key": warehouse_key,
        "quantity_sold":0,
        "quantity_in_stock":0,
        "quantity_compromised":0,
        "quantity_future_movs":0
    }; 
}

exports.products_add = async function(req, res) {
    try {
        if(req.body.barcode && req.body.barcode.length>0) {
            await module.exports.productsSave(req.body);
            res.send({"status":1});
        } else throw new Error("Barcode out of bound");
    } catch (error) {
        res.send({"status":0});
    }
};

exports.productsSave = async function(jsonProduct) {
    try {
        await firestore.doc('products/'+jsonProduct.barcode).set(jsonProduct);
        return 1;
    } catch (error) {
        throw error;
    }
}