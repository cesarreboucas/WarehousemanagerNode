//const {Firestore} = require('@google-cloud/firestore');
const firestore = require('../services/firestore');

//var ref = db.ref();


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

exports.products_add = function(req, res) {
    if(req.body.barcode && req.body.barcode.length>0) {
        firestore.doc('products/'+req.body.barcode).set(
            req.body
        ).then(() => {
            res.send({"status":1});
        }).catch(err => {
            res.send({"status":0});
        });
    } else {
        res.send({"status":0});
    }
}

 /* 
async function quickstart() {
  // Obtain a document reference.
  const document = firestore.doc('products/sevenup2');
 
  // Enter new data into the document.
  
  await document.set({
    title: 'Welcome to Firestore',
    body: 'Hello World',
  });
  console.log('Entered new data into the document');
 
  // Update an existing document.
  await document.update({
    body: 'My first Firestore app',
  });
  console.log('Updated an existing document');
 
  // Read the document.
  let doc = await document.get();
  console.log('Read the document');
 
  // Delete the document.
  await document.delete();
  console.log('Deleted the document');
}
quickstart();

*/


/*
firebase-adminsdk
Email address	
firebase-adminsdk-b2pd4@warehousemanager-2f311.iam.gserviceaccount.com
Key IDs	
7259aa5f28ee3179e59cf9dd15a5ee7a4876b1ae    

*/