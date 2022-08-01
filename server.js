const express = require('express');
const CoinRouter = require('./api/routes/Coin.routes');
const UserRouter = require('./api/routes/user.routes');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://127.0.0.1');

const CONNECTION_URL = "mongodb+srv://momi:hellomongodb@cluster0.wdnf4.mongodb.net/?retryWrites=true&w=majority"

const app = express()
const PORT = process.env.PORT || 3000;

mongoose.connect(CONNECTION_URL , {useNewUrlParser : true , useUnifiedTopology : true})
            .then(() => app.listen(PORT , ()=> console.log("Mongoose connected.")))
            .catch((err) => console.log(err.message))

app.use(express.static('public'));
app.set('view engine', 'ejs');

//Express body-parser is an npm library used to process data sent through an HTTP request body. 
//It exposes four express middlewares for parsing text, JSON, url-encoded and raw data set through an HTTP request body. 
//These middlewares are functions that process incoming requests before they reach the target controller.
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/coins',CoinRouter)

app.use('/users',UserRouter)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname , 'public' , 'index.html'))
})

