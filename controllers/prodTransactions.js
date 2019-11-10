const firestore = require('../services/firestore');

exports.prodTransactionsList = async function(req, res) {
    let transactions = await getTransactions();
    res.send(transactions);
};

async function getTransactions() {
    let prodTransactions = new Array();
    let docs = await firestore.collection('prodTransactions').get();
    for(doc of docs.docs) {
        let transaction = doc.data();
        transaction.id = doc.id;
        prodTransactions.push(transaction);
    }
    return prodTransactions;
}
