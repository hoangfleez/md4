"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const Product_1 = require("./src/entity/Product");
const data_source_1 = require("./src/data-source");
const PORT = 3000;
data_source_1.AppDataSource
    .initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error during Data Source initialization:", err);
});
const app = (0, express_1.default)();
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.get('/products', async (req, res) => {
    let products = await data_source_1.AppDataSource.getRepository(Product_1.Product).find();
    res.render('list', { products: products });
});
app.listen(PORT, () => {
    console.log("App running with port: " + PORT);
});
//# sourceMappingURL=index.js.map