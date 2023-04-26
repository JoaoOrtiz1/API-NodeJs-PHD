'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = async() =>{
    const res = await Product.find({
            active: true
        }, 'title slug price');
        return res;
}

exports.getBySlug = async(slug)=>{
    const res = await Product.findOne({             // utilizar findOne evita que retorne um array
        slug: slug,
        active:true}, 
        'title description price slug tags');
    return res; // NAO ESQUECER O RETURNNNNNNN
}

exports.getById = async(id)=>{
    const res = await Product.findById({
        _id: id,
        active: true
    });
    return res;
}

exports.put = async(id, data)=>{
    const res = await Product.findByIdAndUpdate(id, {
        $set: {
            title: data.title,
            description: data.description,
            price: data.price,
            slug: data.slug
        }
    });
    return res;
}

exports.delete = async(id)=>{
    const verifProduct = await Product.findById(id);
    const res = await Product.findByIdAndRemove(id);
    return verifProduct
}

exports.post = async(body)=>{
    var product = new Product(body);
    await product.save();
}