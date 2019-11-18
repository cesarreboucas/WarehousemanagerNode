const firestore = require('../services/firestore');

exports.movOrderList = async function(req, res) {
    let transactions = await exports.getTransactions();
    res.send(transactions);
};

exports.getMovOrders = async function() {
    let prodTransactions = new Array();
    let docs = await firestore.collection('movOrders').get();
    for(doc of docs.docs) {
        let transaction = doc.data();
        transaction.id = doc.id;
        prodTransactions.push(transaction);
    }
    console.log('[TRANSACTIONS]', prodTransactions);
    return prodTransactions;
}

exports.addMovOrder = async function(req, res) {
    let transaction = await firestore.collection('movOrders').add(req.body);
    res.send({"id" : transaction.id});
}

exports.editMovOrder = async function(req, res) {
    let transaction = await firestore.doc('movOrders/'+req.body.id).update(req.body);
    res.send({"id" : transaction.id});
}
