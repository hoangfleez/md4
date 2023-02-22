import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import bookRoutes from './src/router/book.router';



const PORT = 3000;
const app = express();

app.set("view engine", "ejs");
app.set('views', './src/views');
const DB_URL = 'mongodb://127.0.0.1:27017/demo_2_22';
mongoose.connect(DB_URL)
    .then(() => console.log('DB Connected!'))
    .catch(error => console.log('DB connection error:', error.message));
app.use(bodyParser.json());

app.use('/book', bookRoutes);

app.listen(PORT, () => {

    console.log("App running on port: " + PORT)

})
