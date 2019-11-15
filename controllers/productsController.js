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
        console.log(hangs);
        console.log(movOrder);
        let index = hangs.findIndex(function(e) {
            if(e.barcode==movOrder.barcode) {
                console.log("Returning"+e);
                return e;
            }
        });
        
        if(index == -1) {
            hangs.push(getDefaultHangObj(movOrder, movOrder.warehouse_receiver));
            index = (hangs.length -1);
            console.log("Index "+index);
            console.log(hangs[index]);
            //Inserting the sender Warehouse (if exists)
            if(movOrder.warehouse_sender!==undefined && movOrder.warehouse_sender!="") {
                hangs[index].warehouses.push(getDefaultWaregouseHangObj(movOrder.warehouse_sender));
            }
            
        }
        
        //Looking for the Receiver
        whReceiverIndex = hangs[index].warehouses.findIndex(function(e) {
            if(e.warehouse_key==movOrder.warehouse_receiver) {
                return e;
            }
        });
        if(whReceiverIndex == -1) {
            hangs[index].warehouses.push(getDefaultWaregouseHangObj(movOrder.warehouse_receiver));
            whReceiverIndex = (hangs[index].warehouses.length -1);
        }          
        console.log("whReceiverIndex "+whReceiverIndex);
        if(movOrder.received) {
            hangs[index].warehouses[whReceiverIndex].quantity_in_stock += movOrder.quantity;
        } else {
            hangs[index].warehouses[whReceiverIndex].quantity_future_movs += movOrder.quantity;
        }

        //Looking for the wh sender.
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
    res.send(hangs);
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