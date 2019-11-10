const firestore = require('../services/firestore');

exports.prodTransactionsList = async function(req, res) {
    let transactions = await exports.getTransactions();
    res.send(transactions);
};

exports.getTransactions = async function() {
    let prodTransactions = new Array();
    let docs = await firestore.collection('prodTransactions').get();
    for(doc of docs.docs) {
        let transaction = doc.data();
        transaction.id = doc.id;
        prodTransactions.push(transaction);
    }
    return prodTransactions;
}
