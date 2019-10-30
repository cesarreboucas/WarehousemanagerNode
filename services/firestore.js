const {Firestore} = require('@google-cloud/firestore');

const firestore = new Firestore({
    projectId: 'warehousemanager-2f311',
    keyFilename: "WarehouseManager-6c0de29b8fa9.json"});

module.exports = firestore;
