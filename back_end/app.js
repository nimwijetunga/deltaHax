const express = require('express')
const app = express()
const port = 3000
const multer  = require('multer')
const csv = require('fast-csv')
const upload = multer();

const parse_csv = require('./parse_csv')

app.post('/api/save_data', upload.single('test'), (req, res) => {
    var csv=req.file.buffer.toString('utf8');
    parse_csv.parse_csv(csv)
})

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`App started on port: ${port}!`))