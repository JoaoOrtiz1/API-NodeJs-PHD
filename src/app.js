const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();
const config = require('./config.js');

// Conectando MongoDB
mongoose.connect(config.connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Carregando models
const Product = require('./models/productsS');
const Customer = require('./models/customersS');
const Order = require('./models/ordersS');

// Carregando as rotas
const index = require('./routes/index.js');
const productsRoutes = require('./routes/products.js');
const customerRoutes = require('./routes/customers.js');
const ordersRoutes = require('./routes/orders.js');

const bodyParser = require("body-parser");




app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(express.json({ limit: "50mb", extended: true, parameterLimit: 50000 }));

app.use((res, req, next)=>{
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use('/', index);
app.use('/products', productsRoutes);
app.use('/customers', customerRoutes);
app.use('/orders', ordersRoutes);
module.exports = app;