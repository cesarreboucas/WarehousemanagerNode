const firestore = require('../services/firestore');


exports.getMovOrders = async function() {
    try {
        let prodTransactions = new Array();
        let docs = await firestore.collection('movOrders').get();
        for(doc of docs.docs) {
            let transaction = doc.data();
            transaction.id = doc.id;
            prodTransactions.push(transaction);
        }
    return prodTransactions;
    } catch (error) {
        throw error;
    }
}

exports.addMovOrder = async function(req, res) {
    let transaction = await firestore.collection('movOrders').add(req.body);
    res.send({"id" : transaction.id});
}

exports.editMovOrder = async function(req, res) {
    let transaction = await firestore.doc('movOrders/'+req.body.id).update(req.body);
    res.send({"id" : transaction.id});
}

exports.getAllMovOrders = async function(req, res) {
    try {
        let collection = await module.exports.getMovOrders();
        res.send(collection);
    } catch (error) {
        res.status(500).send(error.message);
    }
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


exports.updateMovOrder = async function(req, res) {
    let side = req.body.side;
    //let done = req.body.done;
    //let id = req.body.id;
    let updateFields = new Object();
    if(side=="received") {
        updateFields.received = true;
    } else {
        updateFields.sent = true;
    }
    console.log(req.body);

    let transaction = await firestore.doc('movOrders/'+req.body.id).update(updateFields);
    console.log(transaction);
    res.send("ok");

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

