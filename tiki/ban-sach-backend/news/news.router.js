const express = require('express');
const newsModel = require('./news.model');
const newsRouter = express.Router();

newsRouter.post(`/create`,(req,res)=>{
    const newNews ={
        imageUrl:req.body.imageUrl,
        title:req.body.title,
        content: req.body.content,
        overview: req.body.overview,
        kind: req.body.kind
    }
    newsModel.create(newNews,(error,data)=>{
        if (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
        else {
            res.status(201).json({
                success: true,
                data: data
            })
        }
    });
})
newsRouter.get(`/findInCountry`,(req,res)=>{
    newsModel.find({kind:"trong nước"},(error,data)=>{
        if (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
        else {
            res.status(201).json({
                success: true,
                data: data
            })
        }
    })
})
newsRouter.get(`/findOutCountry`,(req,res)=>{
    newsModel.find({kind:"nước ngoài"},(error,data)=>{
        if (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
        else {
            res.status(201).json({
                success: true,
                data: data
            })
        }
    })
})
newsRouter.post(`/findByTitle`,(req,res)=>{
    newsModel.find({title:req.body.title},(error,data)=>{
        if (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
        else {
            res.status(200).json({
                success: true,
                id: data[0]._id
            })
        }
    })
})

newsRouter.get(`/findDetail/:id`,(req,res)=>{
    newsModel.findById(req.params.id,(error,data)=>{
        if (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
        else {
            res.status(200).json({
                success: true,
                data:data
            })
        }
    })
})

module.exports = newsRouter