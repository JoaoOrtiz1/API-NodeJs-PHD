'use strict';
var config = require('../config');
const sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey(config.sendgridKey);

exports.send = async (to, subject, body) => {
    sendgrid.send({
        to: to,
        from: 'portal@nlphd.com.br',
        subject: subject,
        html: body
    });
}