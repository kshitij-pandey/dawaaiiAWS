const auth = require('./auth');
const user = require('./user');
const product=require('./product')
const order=require('./order')
const store=require('./store')
const location=require('./location')
const payment=require('./payment')
const Cluster=require('./cluster')
module.exports = app => {
    app.get('/', (req, res) => {
        res.status(200).send({ message: "Sahi kam kar raha hai sab."});
    });
    app.use('/auth', auth);
    app.use('/user', user);
    app.use('/product',product);
    app.use('/order',order);
    app.use('/store',store);
    app.use('/payment',payment);
    app.use('/location',location);
    app.use('/cluster',Cluster);
};