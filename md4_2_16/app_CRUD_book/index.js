const mysql = require('mysql');
const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');


const app = express();
const PORT = 3000;


app.use(fileUpload({
    createParentPath: true
}));


const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'bookmanager',
    charset: 'utf8_general_ci'
});

connection.connect(function (err) {
    if (err) {
        throw err.stack;
    } else {
        console.log('connect database successfully')
    }
});

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json());
app.use(express.static('public'))

app.set("view engine", "ejs");
app.set("views", "./views");

app.get('/books/create', (req, res) => {
    res.render('create')
})
app.post("/books/create", (req, res) => {
    const {name, price, status, author} = req.body;
    let images = req.files.images;
    console.log(images)
    images.mv("./public/images/" + images.name);
    const sqlInsert = "INSERT INTO books(name,price,status,author,images) VALUES ?"
    const values = [[name, price, status, author, images.name]];
    connection.query(sqlInsert, [values], function (err, result) {
        if (err) throw err;
        res.redirect(`/books`)
    })
})
app.get("/books", (req, res) => {
    let offset = req.query.offset || 0
    const sql = "SELECT * FROM books limit 3 offset " + offset;
    connection.query(sql, function (err, result) {
        if (err) throw err;
        res.render("index", {books: result});
    });
})
app.get("/books/:id/delete", (req, res) => {
    const idBook = req.params.id;
    const sql = "DELETE FROM books WHERE id =" + idBook;
    connection.query(sql, function (err, result) {
        if (err) throw err;
        res.redirect(`/books`)
    })
})

app.get("/books/:id/update", (req, res) => {
    const idBook = req.params.id;
    const sql = "SELECT * FROM books WHERE id = " + idBook;
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.render('update', {book: results[0]});
    });
})

app.post("/books/:id/update", (req, res) => {
    const idBook = req.params.id;
    const sql = `UPDATE books SET name = ?, price = ?, author = ?, status = ? WHERE id = ?`;
    const { name, price, status, author } = req.body;
    const value = [name, price, author, status, idBook];
    connection.query(sql, value, (err, results) => {
        if (err) throw err;
        res.redirect('/books');
    });
})

app.listen(PORT, () => {
    console.log("Server running on port:" + PORT);
});