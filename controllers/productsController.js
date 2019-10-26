const {Firestore} = require('@google-cloud/firestore');


//var ref = db.ref();


exports.products_list = function(req, res) {
    
 
// Create a new client
const firestore = new Firestore({
    projectId: 'warehousemanager-2f311',
    keyFilename: "WarehouseManager-6c0de29b8fa9.json"});
 console.log(firestore);

async function quickstart() {
  // Obtain a document reference.
  const document = firestore.doc('products/sevenup');
 
  // Enter new data into the document.
  
  await document.set({
    title: 'Welcome to Firestore',
    body: 'Hello World',
  });
  console.log('Entered new data into the document');
 
  // Update an existing document.
  /*await document.update({
    body: 'My first Firestore app',
  });*/
  console.log('Updated an existing document');
 
  // Read the document.
  /*let doc = await document.get();*/
  console.log('Read the document');
 
  // Delete the document.
  /*await document.delete();*/
  console.log('Deleted the document');
}
quickstart();
res.send("ok");
};

/*
firebase-adminsdk
Email address	
firebase-adminsdk-b2pd4@warehousemanager-2f311.iam.gserviceaccount.com
Key IDs	
7259aa5f28ee3179e59cf9dd15a5ee7a4876b1ae    

*/