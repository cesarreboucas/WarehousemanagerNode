const firestore = require('../services/firestore');


exports.reports_list = function(req, res) {
    
    let reports = new Array();
    firestore.collection('reports').get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                reports.push(doc.data());
            });
            res.send(reports);
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
};