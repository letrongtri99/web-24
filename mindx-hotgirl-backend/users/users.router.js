const express = require('express');
const userModel = require('./users.model');
const userRouter = express.Router();
const bcryptjs = require('bcryptjs');
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//gui request phai cong cả 2 phan

userRouter.post(`/register`, (req, res) => {
    //get email+ pw+ fullName from req.body
    const { email, passWord, fullName } = req.body;
    //validate email,pw,fullName
    if (!email || !emailRegex.test(email)) {
        res.status(400).json({
            success: false,
            message: 'Invalid email address',
        });
    }
    else if (!passWord || passWord.length < 6) {
        res.status(400).json({
            success: false,
            message: 'Password must be at least 6 characters',
        })
    }
    else if (!fullName) {
        res.status(400).json({
            success: false,
            message: 'Please input fullname',
        })
    }
    //check email exist
    else {
        userModel.findOne({ email: email }, (error, data) => {
            if (error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                })
            }
            else if (data) {
                res.status(400).json({
                    success: false,
                    message: 'Email has been used',
                })
            } else {
                //hass password
                const hassPassword = bcryptjs.hashSync(passWord, 10);
                userModel.create({
                    ...req.body,
                    passWord: hassPassword,
                }, (error1, newUsers) => {
                    if (error1) {
                        res.status(500).json({
                            success: false,
                            message: error1.message,
                        })
                    }
                    else {
                        res.status(201).json({
                            success: true,
                            data: {
                                ...newUsers._doc,
                                passWord: ' '
                            }
                        });
                    }
                });
            }
        });
    }
    //save to db
});
userRouter.post(`/login`, (req, res) => {
    //get email+ pw from req.body
    const { email, passWord } = req.body;
    //check email exist
    userModel.findOne({ email: email }, (error, data) => {
        if (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            })
        }
        else if (!data) {
            res.status(400).json({
                success: false,
                message: 'Email has not been created'
            })
        }
        else {
            if (bcryptjs.compareSync(passWord, data.passWord)) {
                req.session.currentUser = {
                    _id: data._id,
                    email: data.email,
                    fullName: data.fullName,
                }
                req.session.save((error) => {
                    res.json({
                        success: true,
                    })
                })
                // res.status(200).json({
                //     success: true,
                //     message: "Login success"
                // })
                // res.redirect(`/profile`);
            }
            else {
                res.status(400).json({
                    success: false,
                    message: 'Password is not correct'
                })
            }
        }
    });
    //compare password

    //save info to session
});
userRouter.get(`/profile`, (req, res) => {
    // if(req.session.currentUser){
    //     return res.json({
    //         currentUser: req.session.currentUser
    //     })
    // }
    // else{
    //     return res.json({
    //         currentUser: 'Chưa đăng nhập'
    //     })
    // }
    req.session.save((error) => {
        if (req.session.currentUser) {
            res.json({
                currentUser: req.session.currentUser
            })
        }
        else {
            res.json({
                currentUser: 'Chưa đăng nhập'
            })
        }
    })
});
userRouter.get(`/logout`, (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: 'Logout success'
            });
        }
    })
})
module.exports = userRouter;