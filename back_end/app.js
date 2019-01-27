const express = require("express");
const app = express();
const port = 8000;
const multer = require("multer");
const csv = require("fast-csv");
const upload = multer();

const db = require("./db_operations");
const line_detect = require("./get_coords");

app.post('/api/save_data', upload.single('file'), async (req, res) => {
    var csv = req.file.buffer.toString('utf8');
    await db.insert_users_to_db(csv).catch((err) => {
        res.send(JSON.stringify({"posted":false}))
    })
    res.send(JSON.stringify({"posted":true}))
})

app.post('/api/get_rect_coords', upload.single('pdf_doc'), async (req, res) => {
    let buffer = req.file.buffer
    console.log(buffer)
    let data = await line_detect.get_coords(buffer).catch((err) => {
        res.send(JSON.stringify({"posted":false}))
    })
    res.send(JSON.stringify({"posted":true}))
})

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`App started on port: ${port}!`));
