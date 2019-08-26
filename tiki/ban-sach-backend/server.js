const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const newsRouter = require('./news/news.router');
const productsRouter = require('./products/products.router');
const userRouter = require('./users/users.router');
const adminRouter = require('./admin/admin.router');
const uploadRouter = require('./uploads/uploads.router');
const buyRouter = require('./buy/buy.router')
mongoose.connect(`mongodb://localhost:27017/sellbook`,{useNewUrlParser:true},(error)=>{
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
        app.use('/users',userRouter);
        app.use('/admin',adminRouter);
        app.use('/uploads',uploadRouter);
        app.use('/buy',buyRouter);
        //use middleware

        app.listen(3001);
    }
})