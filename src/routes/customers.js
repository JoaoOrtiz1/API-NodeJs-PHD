'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer-controller.js');
const authService = require('..//services/auth-service');

router.post("/", controller.post);
router.post("/auth", controller.authenticate);
router.post("/refresh", authService.authorize ,controller.refreshToken);
router.get('/', controller.get);
router.delete('/', controller.delete);

module.exports = router;
