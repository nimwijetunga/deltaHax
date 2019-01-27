const CSV = require('csv-string')

var admin = require('firebase-admin');
var serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://deltahacksdb.firebaseio.com/"
});

var ref = admin.app().database().ref();
var usersRef = ref.child('users');
var userRef = usersRef.push();

var add_user = function (entry) {
    return new Promise(function (resolve, reject) {
        usersRef.push(entry, (error) => {
            reject(false);
        });
        resolve(true);
    });
}

var delete_all_users = function(){
    return new Promise((resolve, reject) => {
        usersRef.remove().catch((err) => reject(false))
        resolve(true)
    })
}


module.exports = {
     insert_users_to_db: async function(csv_string){
        return new Promise(async function (resolve, reject) {
            await delete_all_users().catch((err) => reject(false))
            const user_arr = CSV.parse(csv_string);
            count = 0
            fields = []
            user_arr.forEach( async function (user) {
                count_cur = 0
                user_obj = {}
                user.forEach((field) => {
                    if(count == 0){
                        fields.push(field)
                    }else{
                        user_obj[fields[count_cur]] = field
                    }
                    count_cur++
                })
                count = count + 1
                await add_user(user_obj).catch((err) => {
                    reject(false)
                })
            });
            resolve(true)
        })
    }
};