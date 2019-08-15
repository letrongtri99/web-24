const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userModel = require('./users/users.model');
const userRouter = require('./users/users.router');
const postRouter = require('./posts/posts.router');
const uploadRouter = require('./uploads/uploads.router');
const session = require('express-session');
const cors = require('cors');
mongoose.connect('mongodb://localhost:27017/techkid-hotgirl', (error) => {
    if (error) {
        throw error;
    }
    else {
        console.log('Success rồi');
        const app = express();
        //routers
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
        app.use('/users', userRouter);
        app.use('/posts',postRouter);
        app.use('/uploads',uploadRouter);
        //use middleware

        app.listen(3001);
    }
});
