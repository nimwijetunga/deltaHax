const db = require('./db_operations')

module.exports = {
    get_user_data: async (mapping_data) => {
        let users = await db.get_all_Users().catch((err) => {return false})
        console.log(mapping_data)
        let final_mapped_data = []
        return new Promise((resolve, reject) => {
            users.forEach(user => {
                let user_mod = {}
                user_mod['user_info'] = user
                user_mod['box_info'] = []
                for(var i = 0; i < mapping_data.length; i++){
                    user_mod['box_info'].push({
                        'title':mapping_data[i]['title'],
                        'coords':mapping_data[i]['coords']
                    })
                }
                final_mapped_data.push(user_mod)
            });
            resolve(final_mapped_data)
        })
    }
}