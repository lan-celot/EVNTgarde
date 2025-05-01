const express = require('express');
const cors = require('cors');
const pool  = require('./database.js');

const app = express();

app.use(express.json());
app.use(cors());

app.post("/adduser", (req, res) => {
    const username = req.body["username"]
    const password = req.body["password"]

    console.log("Username: " + username)
    console.log("Password: " + password)

    const insertSTMT = `INSERT INTO vendor_account_data (username, password) VALUES ('${username}', '${password}');`

    pool.query(insertSTMT).then((response) => {
        console.log("Data Saved")
        console.log(response)
    })
    .catch((err) => {
        console.log(err)
    })

    console.log(req.body)
    res.send("Response Received: " + req.body)
});

app.listen(4000, () => console.log('Server on localhost:4000'));