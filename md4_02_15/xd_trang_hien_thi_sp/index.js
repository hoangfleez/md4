const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

const products = [
    {
        title: 'iphone 14',
        src: 'images/iphone.jpg'
    },
    {
        title: 'oppo',
        src: 'images/oppo.jpg'
    },
    {
        title: 'samsung',
        src: 'images/samsung.jpg'
    },
    {
        title: 'xiaomi',
        src: 'images/xiaomi.jpg'
    }
]

app.get('/', ((req, res) => {
    res.render('home', {data: products})
}))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});