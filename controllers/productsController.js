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

exports.products_add = async function(req, res) {
    try {
        if(req.body.barcode && req.body.barcode.length>0) {
            await module.exports.productsSave(req.body);
            res.send({"status":1});
        } else throw new Error("Barcode out of bound");
    } catch (error) {
        res.send({"status":0});
    }
}

exports.productsSave = async function(jsonProduct) {
    try {
        await firestore.doc('products/'+jsonProduct.barcode).set(jsonProduct);
        return 1;
    } catch (error) {
        throw error;
    }
}

 