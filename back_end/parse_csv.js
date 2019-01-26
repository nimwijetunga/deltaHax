const CSV = require('csv-string')


module.exports = {
     parse_csv: function(csv_string){
        const arr = CSV.parse(csv_string);
        
        console.log(arr)
    }
};