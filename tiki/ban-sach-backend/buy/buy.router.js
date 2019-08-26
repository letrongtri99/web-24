const express = require('express');
const buyModel = require('./buy.model');
const buyRouter = express.Router();

buyRouter.post(`/create`, (req, res) => {
    buyModel.findOne({ products: req.body.title }, (error, data) => {
        if (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            })
        }
        else if (data) {
            data.price+= Number(req.body.price);
            data.amount+=Number(req.body.amount);
            data.save((error3,newProducts)=>{
                if (error3) {
                    res.status(500).json({
                        success: false,
                        message: error.message
                    })
                }
                else {
                    res.status(200).json({
                        success: true,
                        message: 'Buy success',
                    });
                }
            })
        } else {
            buyModel.create({
                products: req.body.title,
                email: req.body.email,
                price: req.body.price,
                amount: req.body.amount,
                imageUrl : req.body.imageUrl,
                fullName: req.body.fullName
            },(error2,data2)=>{
                if (error) {
                    res.status(500).json({
                        success: false,
                        message: error.message,
                    })
                }
                else{
                    res.status(200).json({
                        success:true,
                        data:data
                    })
                }
            })
            ;
        }
    });
})

buyRouter.get(`/findDetail/:email`, (req, res) => {
    buyModel.find({email:req.params.email}, (error, data) => {
        if (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
        else {
            res.status(200).json({
                success: true,
                data: data
            })
        }
    })
})

buyRouter.get(`/findAll`,(req,res)=>{
    buyModel.find({},(error,data)=>{
        if (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
        else {
            res.status(200).json({
                success: true,
                data: data
            })
        }
    })
})



module.exports = buyRouter