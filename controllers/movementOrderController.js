const firestore = require('../services/firestore');


exports.getMovOrders = async function() {
    let prodTransactions = new Array();
    let docs = await firestore.collection('movOrders').get();
    for(doc of docs.docs) {
        let transaction = doc.data();
        transaction.id = doc.id;
        prodTransactions.push(transaction);
    }
    //console.log('[TRANSACTIONS]', prodTransactions);
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

exports.getTodoOrders = async function(req, res) {
    let name = req.params.warehouse;
    let todoArray = [];
    try {
        let collection = await exports.getMovOrders();
        //console.log(collection);
        collection.forEach(element => {
            if(element.warehouse_receiver === name && element.received === false || 
                element.warehouse_sender === name && element.sent === false)
                {
                    todoArray.push(element);
                }
        });
        res.send(todoArray);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

exports.getPendingOrders = async function(req, res) {
    let name = req.params.warehouse;
    let todoArray = [];
    let collection = firestore.collection('movOrders');
    try {
        let snapshot = await collection.where('warehouse_receiver', '==', name)
                                        .where('reported', '==', true)
                                        .get();
        snapshot.forEach(doc => {
            todoArray.push(doc.data());
        });
      res.send(todoArray);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

exports.getCompletedOrders = async function(req, res) {
    let name = req.params.warehouse;
    let todoArray = [];
    try {
        let collection = await exports.getMovOrders();

        collection.forEach(element => {
            if(element.warehouse_receiver === name && element.received === true || 
                element.warehouse_sender === name && element.sent === true)
                {
                    todoArray.push(element);
                }
        });
        res.send(todoArray);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

