'use strict'
const ValidationContract = require('../validators/fluent-validator');
const repositorie = require('../repositories/customer-repositorie');
const emailService = require('..//services/mail-service');
const authService = require('..//services/auth-service');
const md5 = require('md5');

exports.post = async(req, res, next) => {
    let contract = new ValidationContract;
    if(!contract.validationsCustomer(req.body,res)){
        try {
            emailService.send(req.body.email,'teste email','teste envio de email bem-vindo'+ req.body.name);
            await repositorie.post(req.body, req.body.password);
            res.status(201).send({
            message: 'Cliente cadastrado com sucesso'
        });
        } catch (error) {
            res.status(500).send({
                message: "Falha na requisição",
                error: error.message
            });
        }
    }
    
};


exports.authenticate = async(req, res, next) => {
    let contract = new ValidationContract;
    if(!contract.validationsCustomerAuth(req.body,res)){
        try {
            const customerAuth = await repositorie.authenticate({
                email: req.body.email,
                password: md5(req.body.password + global.SALT_KEY)
            });

            if(!customerAuth){
                res.status(404).send({
                    message: 'Invalid User or Password'
                });
                return;
            }
            const token = await authService.generationToken({
                id: customerAuth._id,
                email: customerAuth.email,
                name: customerAuth.name,
                roles: customerAuth.roles
            });
            res.status(201).send({
                token: token,
                data: {
                    email: customerAuth.email,
                    name: customerAuth.name
                }
            });
        } catch (error) {
            res.status(500).send({
                message: "Falha na requisição",
                error: error.message
            });
        }
    }
    
};

exports.refreshToken = async(req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);
        const customer = await repositorie.getById(data.id);

        
        if(!customer){
            res.status(404).send({
                message: 'Cliente nao encontrado'
            });
            return;
        }
        const tokenData = await authService.generationToken({
            id: customer._id,
            email: customer.email,
            name: customer.name,
            roles: customerAuth.roles
        });
        res.status(201).send({
            token: tokenData,
            data: {
                email: customer.email,
                name: customer.name
            }
        });

    } catch (error) {
        res.status(500).send({
            message: "Falha na requisição",
            error: error.message
        });
    }
};

exports.get = async(req, res, next) =>{
    try {
        var data = await repositorie.get();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Falha na requisição",
            error: error.message
        });
    }
}

exports.delete = async(req, res, send)=>{
    try {
        await repositorie.delete(req.body.id);
        res.status(200).send({
            message: 'Cliente deletado com sucesso'
        })
    } catch (error) {
        res.status(500).send({
            message: "Bad request",
            error: error.message
        })   
    }
}