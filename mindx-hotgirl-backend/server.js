const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userModel = require('./users/users.model');
const userRouter = require('./users/users.router');
const session = require('express-session');
mongoose.connect('mongodb://localhost:27017/techkid-hotgirl',(error)=>{
    if(error){
        throw error;
    }
    else{
        console.log('Success rồi');
        const app = express();
        //routers
        app.use(bodyParser.json());
        app.use(session({
            secret:'keyboard cat'
        }));
        app.use('/users',userRouter);
        //use middleware
        
        app.listen(3001);
    }
});
