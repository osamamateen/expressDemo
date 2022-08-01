const express = require('express');
const CoinRouter = express.Router();
const CoinController = require('../../controller/coin.controller')

CoinRouter.get('/', CoinController.apiGetAllCoins);

CoinRouter.get('/:id', CoinController.apiGetCoinById);

CoinRouter.post('/create', CoinController.apiCreateCoin);

CoinRouter.delete('/delete/:id', CoinController.apiDeleteCoin);

CoinRouter.put('/edit/:id', CoinController.apiUpdateCoin);

CoinRouter.route('/createFile').get((req, res) => {
    res.render('create');
});

module.exports = CoinRouter;