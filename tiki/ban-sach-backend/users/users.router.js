const express = require('express');
const userModel = require('./users.model');
const userRouter = express.Router();
const bcryptjs = require('bcryptjs');
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
});

userRouter.post(`/login`, (req, res) => {
    //get email+ pw from req.body
    const { email, passWord, role } = req.body;
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
                    role: data.role,
                    permission: data.permission
                }
                res.status(200).json({
                    success: true,
                    message: "Login success",
                    data: {
                        email: data.email,
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

userRouter.put(`/updateBuy`, (req, res) => {
    const { email, title, price, amount } = req.body;
    // console.log(formatMoney(price));
    userModel.findOne({ email: email }, (error, data) => {
        if (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
        else if (!data) {
            res.status(400).json({
                success: false,
                message: 'Email has not been created'
            })
        }
        else {
            if (!data.products.includes(title)) {
                data.products.push(title);
                data.price += Number(price);
                data.amount.push(parseInt(amount,10));
                data.priceEach.push(parseInt(price,10));
                data.save((error, data2) => {
                    if (error) {
                        res.status(500).json({
                            success: false,
                            message: error.message
                        })
                    }
                    else {
                        res.status(200).json({
                            success: true,
                            message: 'Buy success'
                        });
                    }
                })
            }
            else {
                const i = data.products.indexOf(title);
                data.price += Number(price);
                data.amount[i]=data.amount[i]+Number(amount);
                data.priceEach[i]= data.priceEach[i]+Number(price);
                data.save((error, data2) => {
                    if (error) {
                        res.status(500).json({
                            success: false,
                            message: error.message
                        })
                    }
                    else {
                        console.log(data2);
                        res.status(200).json({
                            success: true,
                            message: 'Buy success',
                        });
                    }
                })
            }
            
        }
    })
})

userRouter.get(`/findAll`,(req,res)=>{
    userModel.find({},(error,data)=>{
        res.json({
            data:data
        })
    })
})

module.exports = userRouter;