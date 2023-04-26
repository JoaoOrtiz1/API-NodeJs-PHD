'use strict'

const mongoose = require('mongoose');
const Order = mongoose.model('Order');


exports.post = async(req, num, data) =>{
    var order = new Order(req);
    order.customer = data; 
    order.number = num;
    await order.save();
}

exports.get = async() =>{
    var res = await Order.find({})
    .populate('customer')
    .populate('items.product');
    return res;
}

exports.delete = async(id) =>{
    var data = await Order.findByIdAndDelete(id);
    return data;
}