'use strict'

const md5 = require('md5');
const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.get = async() =>{
    const res = await Customer.find({});
    return res;
}

exports.getById = async(id) =>{
    const res = await Customer.findById(id);
    return res;
}

exports.post = async(body, passwd)=>{
    var customer = new Customer(body);
    customer.password = md5(passwd+ SALT_KEY);
    await customer.save();
}

exports.delete = async(id)=>{
    const res = await Customer.findByIdAndDelete(id);
}

exports.authenticate = async(data)=>{
    const res = await Customer.findOne({
        email: data.email,
        password: data.password
    });
    return res;
}