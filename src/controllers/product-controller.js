'use strict'
const ValidationContract = require('../validators/fluent-validator');
const repositorie = require('../repositories/product-repositorie');
const cloud = require('../services/cloud-service');

exports.get = async(req, res, next) => {
    try {
        var data = await repositorie.get();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Falha na requisição",
        e: error.message});
    }
}

exports.getBySlug = async(req, res, next) => {
    try {
        var data = await repositorie.getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Falha na requisição",
        e: error.message});
    }
}

exports.getById = async(req, res, next) => {
    try {
        var data = await repositorie.getById(req.params.id);
        console.log(data);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Falha na requisição",
            error: error.message
        });
    }
}

exports.getByTag = async(req, res, next) => {
    try {
        var data = await repositorie.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Falha na requisição",
            error: error.message
        });
    }
}

exports.post = async(req, res, next) => {
    let contract = new ValidationContract;
    if(!contract.validationsProduct(req.body,res)){
        try {
            await repositorie.post(req.body);
            //await cloud.getImage(req.body.image); descontinuado 
            res.status(201).send({
            message: 'Produto cadastrado com sucesso'
        });
        } catch (error) {
            res.status(500).send({
                message: "Falha na requisição",
                error: error.message
            });
        }
    }
    
};

exports.put = async(req, res, next) => {
    try {
        var data = await repositorie.put(req.params.id, req.body);
        if(data != null){
            res.status(201).send({
                message: 'Produto atualizado com sucesso'
            });
       }else{
        res.status(200).send({
            message: "Produto não encontrado ou ja deletado!"
        });
       }
    } catch (error) {
        res.status(500).send({
            message: "Falha na requisição",
            error: error.message
        });
    }
};

exports.delete = async(req, res, next) => {
    try {
        var data = await repositorie.delete(req.body.id);
       if(data != null){
            res.status(201).send({
            message: 'Produto deletado com sucesso' 
        });
       }else{
        res.status(200).send({
            message: "Produto não encontrado ou ja deletado!"
        });
       }
    } catch (error) {
        res.status(500).send({
            message: "Falha na requisição",
            error: error.message
        });
    }
};

