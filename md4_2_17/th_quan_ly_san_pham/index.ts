import multer from 'multer';
const upload = multer();
import express from "express";
import bodyParser from 'body-parser';
import {Product} from "./src/entity/Product";
import {AppDataSource} from "./src/data-source";
const PORT = 3000;

// thiết lập kết nối cơ sở dữ liệu
AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

const app = express();
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(bodyParser.json());
app.use(express.json());


app.get('/products', async (req: Request, res: Response) => {
    let products = await AppDataSource.getRepository(Product) .find();
    res.render('list', {products: products});
})

app.listen(PORT, () => {
    console.log("App running with port: " + PORT)
})