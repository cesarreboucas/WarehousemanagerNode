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
    const ordersController = require('../controllers/ordersController');
    
    // Getting All Orders
    let allOrders = await ordersController.ordersList();
    let hangs = new Array();
    console.log(allOrders[0]);
    allOrders.forEach(prod => {  
        let whIndex = 0; // Default warehouse Index.
        let index = hangs.findIndex(function(e) {
            if(e.product_key==prod.product_key) {
                return e;
            }
        });

        if(index == -1) {
            hang = new Object();
            hang.product_key = prod.product_key
            hang.product_name = prod.product_name
            hang.warehouses = new Array();
            hang.warehouses.push(new Object());
            hang.warehouses[0].warehouse_key = prod.warehouse_key;
            hang.warehouses[0].quantity_sold = 0;
            hang.warehouses[0].quantity_in_stock = 0;
            hang.warehouses[0].quantity_compromised = 0;
            hangs.push(hang);
            index = (hangs.length -1);
        } else {
             whIndex = hangs[index].warehouses.findIndex(function(e) {
                if(e.warehouse_key==prod.warehouse_key) {
                    return e;
                }
            });

            if(whIndex == -1) {
                let wh = {"warehouse_key": prod.warehouse_key,
                    "quantity_sold":0,
                    "quantity_in_stock":0,
                    "quantity_compromised":0
                };
                hangs[index].warehouses.push(wh);
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
    res.send(hangs);
}

exports.products_quantitys = async function(req, res) {
    if(req.query.barcode===undefined) {
        res.send("Pleas fill the \"barcode\"");
    }
    //TODO
    res.send("TODO!");
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