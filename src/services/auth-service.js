'use strict'
const jwt =  require('jsonwebtoken');

exports.generationToken =async(data)=>{
    return jwt.sign(data, global.SALT_KEY, {expiresIn: '1d'});
}

exports.decodeToken = async (token)=>{
    var data = await jwt.verify(token, global.SALT_KEY);
    return data;
}

exports.authorize = (req, res, next)=>{
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    
    if(!token){
        res.status(401).json({
            message: 'Acesso Restrito'
        });
    }else{
        jwt.verify(token, global.SALT_KEY, (error ,decoded)=>{
            if(error){
                res.status(401).json({
                    message: 'Token Invalido'
                });
            }else{
                next();
            }
        })
    }
}

exports.isAdmin = (req, res, next)=>{
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    
    if(!token){
        res.status(401).json({
            message: 'Acesso Restrito'
        });
    }else{
        jwt.verify(token, global.SALT_KEY, (error ,decoded)=>{
            if(error){
                res.status(401).json({
                    message: 'Token Invalido'
                });
            }else{
                if(decoded.roles.includes('admin')){
                    next();
                }else{
                    res.status(403).send({
                        message: 'Esta funcionalidade e restrita para admins'
                    })
                }
            }
        })
    }
}
