const express = require("express");
const app = express();
const port = 8000;
const multer = require("multer");
const csv = require("fast-csv");
const upload = multer();

const parse_csv = require("./parse_csv");

app.post('/api/save_data', upload.single('file'), (req, res) => {
    var csv=req.file.buffer.toString('utf8');
    await parse_csv.insert_users_to_db(csv).catch((err) => {
        res.send(JSON.stringify({"posted":false}))
    })
    res.send(JSON.stringify({"posted":true}))
})

  parse_csv.parse_csv(csv);
  console.log(csv);
  res.send("HELLO");
});

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`App started on port: ${port}!`));
