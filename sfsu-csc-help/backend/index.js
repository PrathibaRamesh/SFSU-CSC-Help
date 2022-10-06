const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user : "root",
    host: "localhost",
    password: "root",
    database: "mydb",
});

app.post('/register', (req, res) => {

    const userName = req.body.userName;
    const userPassword = req.body.userPassword;

    db.query(
        "INSERT INTO users (userName, userPassword) values (?,?)",
        [userName, userPassword],
        (err, result) => {
            if (err != null) {
                console.log(err);
            }
        }
    );
});

app.post('/login', (req, res) => {

    const userName = req.body.userName;
    const userPassword = req.body.userPassword;

    db.query(
        "SELECT * FROM users WHERE userName = ? AND userPassword = ?",
        [userName, userPassword],
        (err, result) => {
            if (err) {
                //console.log(err);
                res.send({ err: err });
            }
            if (result.length > 0) {
                res.send(result)
            }
            else {
                res.send({ message: "Wrong username and password combination!" });
            }
        }
    );
});

app.listen(3003, () => {
    console.log("server running");
});