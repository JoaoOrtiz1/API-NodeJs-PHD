'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/order-controller.js');
const authService = require('..//services/auth-service');

router.post('/', controller.post, authService.authorize);
router.get('/', controller.get, authService.authorize);
router.delete('/', controller.delete);

module.exports = router;