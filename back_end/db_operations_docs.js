var admin = require('firebase-admin');
var serviceAccount = require('./serviceAccountKey.json');

var ref = admin.app().database().ref();

var docsRef = ref.child('docs');
var docRef = docsRef.push();

module.exports = {
    add_doc: function (buffer){
        return new Promise((resolve, reject) => {
            docsRef.push({"hello":"yellow"}, (error) => {
                reject(false)
            })
            resolve(true)
        })
    }
};