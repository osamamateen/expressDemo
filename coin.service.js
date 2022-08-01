const CoinModel = require('../model/Coin.model');

class CoinService {

    static async getAllCoins() {
        try {
            let response = await CoinModel.find()
            return response;
        }
        catch (err) {
            console.log(err.message)
        }
    }

    static async getById(params) {
        try {
            let response = {};
            let coin = await CoinModel.findById(params.id);
            let temp = {};
            temp.name = coin.name;
            temp.price = coin.price;
            if (coin) {
                response.status = 200,
                    response.data = temp,
                    response.message = "Coin found."
            }
            else {
                response.status = 400,
                    response.data = {},
                    response.message = "Coin not found"
            }
            return response;
        } catch (error) {
            console.log(error.message);
        }
    }

    static async createCoin(body) {
        const newCoin = new CoinModel(body);

        newCoin.save().then(coin => {
            // console.log("savedd.");
            return newCoin;
        })
            .catch(err => {
                res.status(400).send("unable to save to database");
            });
    }

    static async editCoin(id, body) {

        try {
            let response = {};
            let coin = await CoinModel.findById(id)
            let { name, price } = body;
            if (coin) {
                coin.name = name;
                coin.price = price;
                coin.save();

                response.status = 200;
                response.data = {name , price};
                response.message = `${coin.name} updated succesfully.`+` New price is: ${coin.price}`
            }
            else {
                response.status = 400,
                    response.data = {},
      
                    response.message = "Coin not found"
            }
            return response;

        } catch (error) {
            console.log(error.message);
        }
    }

    static async deleteCoin(id) {
        try {
            let response = {};
            let coin = await CoinModel.findById(id)
            if (coin) {
                coin.delete();
                response.status = 200,
                    response.data = coin,
                    response.message = "Coin deleted succesfuly."
            }
            else {
                response.status = 400,
                    response.data = {},
                    response.message = "Coin not found"
            }
            return response;
        }
        catch (err) {
            console.log(err)
        }
    }

}

module.exports = CoinService