const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userModel = require('./users/users.model');
const userRouter = require('./users/users.router');
const session = require('express-session');
mongoose.connect('mongodb://localhost:27017/techkid-hotgirl', (error) => {
    if (error) {
        throw error;
    }
    else {
        console.log('Success rồi');
        const app = express();
        //routers
        app.use(function (req, res, next) {

            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', '*');

            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,content-type,Accept');

            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', true);

            // Pass to next layer of middleware
            next();
        });
        app.use(bodyParser.json());
        app.use(session({
            secret: 'keyboard cat',
            resave:false,
            saveUninitialized:true,
            cookie:{maxAge: 1000*60*60*24}
        }));
        app.use('/users', userRouter);
        //use middleware

        app.listen(3001);
    }
});
