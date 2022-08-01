const connection = require('../database/mysql_connection')

class buyCoinService {

    static async buyCoins(user_id, coin_id, quantity) {
        let user = {};
        let coin = {}
        const resultt = await connection.query("select * from users where id = ?", user_id, (err, result, fields) => {
            if (err) throw err;
            user = result[0];
            console.log("R:",result[0].fname);
        })

        console.log("await Result: ",resultt)

        connection.query("select * from coins where id = ?", coin_id, (err, result, fields) => {
            if (err) throw err;
            coin = result[0].price;
            console.log("coin:",result[0].price);
        })

        if(user && coin){
            
        }
    }


}

module.exports = buyCoinService;