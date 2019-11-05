const firestore = require('../services/firestore');


exports.warehouse_list = function(req, res) {
    
    let warehouses = new Array();
    firestore.collection('warehouses').get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                warehouses.push(doc.data());
            });
            res.send(warehouses);
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
};

exports.warehouse_add = async function(req, res) {
    try {
        if(req.body.name && req.body.name.length>0) {
            await module.exports.warehouseSave(req.body);
            res.send({"status":1});
        } else throw new Error("name needed");
    } catch (error) {
        res.send({"status":0});
    }
}

exports.warehouseSave = async function(jsonWarehouse) {
    try {
        await firestore.doc('warehouses/'+jsonWarehouse.name).set(jsonWarehouse);
        return 1;
    } catch (error) {
        throw error;
    }
}