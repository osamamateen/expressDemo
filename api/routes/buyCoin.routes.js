const express = require('express');
const buyCoinRouter = express.Router();
const buyCoinController = require('../../controller/buyCoin.controller')

buyCoinRouter.post('/',buyCoinController.apiBuyCoin)

module.exports = buyCoinRouter;