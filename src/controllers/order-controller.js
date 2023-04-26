'use strict'
const ValidationContract = require('../validators/fluent-validator');
const repositorie = require('../repositories/order-repositorie');
const authService = require('..//services/auth-service');
const guid = require('guid');


exports.post = async(req, res, next) =>{
    let contract = new ValidationContract;
    let num = Buffer.from(guid.raw()).readUIntBE(0,6);
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);
        if(!contract.validationsOrder(req.body,res, data)){
            await repositorie.post(req.body, num, data.id);
            res.status(201).send({
            message: 'Ordem cadastrada com sucesso'
        });
        }
    } catch (error) {
        res.status(500).send({
            message: "Falha na requisição",
            error: error
        });
    }
}

exports.get = async(req, res, next) =>{
    try {
        var data = await repositorie.get();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Falha na requisição",
            error : error.message
        });
    }
}

exports.delete = async(req, res, next) =>{
    try {
        var data = await repositorie.delete(req.body.id);
        res.status(200).send({
            message: "Ordem deletada com sucesso"
        })
    } catch (error) {
        res.status(500).send(error,{
            message: "Falha na requisição",
            error: error.message
        });
    }
}