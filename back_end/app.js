const express = require("express");
const app = express();
const port = 8000;
const multer = require("multer");
const csv = require("fast-csv");
const upload = multer();

const db = require("./db_operations");
const data_parse = require("./parse_data")
const bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(port, () => console.log(`App started on port: ${port}!`));

app.post('/api/save_data', upload.single('file'), async (req, res) => {
    let csv = req.file.buffer.toString('utf8');
    await db.insert_users_to_db(csv).catch((err) => {
        res.send(JSON.stringify({"posted":false}))
    })
    res.send(JSON.stringify({"posted":true}))
})

/*
- Assum the data is sent in this format {
                                           "data": [{"fieldName":"abc", "coords": [1,2,3,4]}, ...]
                                        }
*/
app.post('/api/get_data', async(req, res) => {
    let body = req.body
    if(!body['data']) res.send(JSON.stringify({"posted":false}))
    let data = await data_parse.get_user_data(body['data'])
    res.send(JSON.stringify(data))
})

app.get("/", (req, res) => res.send("Hello World!"));
