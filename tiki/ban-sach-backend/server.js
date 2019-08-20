const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const newsRouter = require('./news/news.router');
const productsRouter = require('./products/products.router');
mongoose.connect(`mongodb://localhost:27017/sellbook`,(error)=>{
    if(error){
        throw error;
    }
    else{
        console.log('Success rồi');
        const app = express();
        app.use(cors({
            origin:'http://localhost:3000',
            credentials:true
        }));
        app.use(bodyParser.json());
        app.use(session({
            secret: 'keyboard cat',
            resave:false,
            saveUninitialized:false,
            cookie:{maxAge: 1000*60*60*24}
        }));
        app.use(express.static('public'));
        app.use('/news',newsRouter);
        app.use('/products',productsRouter);
        //use middleware

        app.listen(3001);
    }
})