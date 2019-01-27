const fs = require('fs');
const spawn = require('child_process').spawn;

module.exports = {
    get_coords: (pdf_buffer) => {
        return new Promise((resolve, reject) => {
            const pythonProcess = spawn('python',["./line_detect.py", 1]);
            console.log(__dirname);
            let data = pythonProcess.stdout.on('data', (data) => {
                console.log("DONE")
                resolve(data)
            });
            pythonProcess.on('error', function(err) {
               reject(false)
            });
        })
    }
}

