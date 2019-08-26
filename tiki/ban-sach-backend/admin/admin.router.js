const express = require('express');
const adminModel = require('./admin.model');
const adminRouter = express.Router();
const bcryptjs = require('bcryptjs');
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

adminRouter.post(`/register`, (req, res) => {
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
        adminModel.findOne({ email: email }, (error, data) => {
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
                adminModel.create({
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
});

adminRouter.post(`/login`, (req, res) => {
    //get email+ pw from req.body
    const { email, passWord,role } = req.body;
    //check email exist
    adminModel.findOne({ email: email }, (error, data) => {
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
                    role: data.role,
                    permission: data.permission
                }
                res.status(200).json({
                    success: true,
                    message: "Login success",
                    data:{
                        email:data.email,
                        fullName: data.fullName,
                        role: data.role
                    }
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    message: 'Password is not correct'
                })
            }
        }
    });
});

adminRouter.get(`/logout`, (req, res) => {
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

module.exports = adminRouter;