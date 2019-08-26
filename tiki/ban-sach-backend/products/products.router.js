const express = require('express');
const productsModel = require('./products.model');
const productsRouter = express.Router();

productsRouter.post(`/create`, (req, res) => {
    const newProducts = {
        imageUrl: req.body.imageUrl,
        title: req.body.title,
        kind: req.body.kind,
        price: req.body.price,
        deductprice: req.body.deductprice
    }
    productsModel.create(newProducts, (error, data) => {
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

productsRouter.get(`/findVanHoc`, (req, res) => {
    productsModel.find({ kind: "văn học" }, (error, data) => {
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

productsRouter.get(`/findKinhTe`, (req, res) => {
    productsModel.find({ kind: "kinh tế" }, (error, data) => {
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

productsRouter.get(`/findTamLy`, (req, res) => {
    productsModel.find({ kind: "tâm lí" }, (error, data) => {
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

productsRouter.get(`/findNuoiCon`, (req, res) => {
    productsModel.find({ kind: "nuôi con" }, (error, data) => {
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

productsRouter.get(`/findThieuNhi`, (req, res) => {
    productsModel.find({ kind: "thiếu nhi" }, (error, data) => {
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

productsRouter.get(`/findTieuSu`, (req, res) => {
    productsModel.find({ kind: "tiểu sử" }, (error, data) => {
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

productsRouter.get(`/findNgoaiNgu`, (req, res) => {
    productsModel.find({ kind: "ngoại ngữ" }, (error, data) => {
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

productsRouter.post(`/findByTitle`, (req, res) => {
    productsModel.findOne({ title: req.body.title }, (error, data) => {
        if (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
        else {
            res.status(200).json({
                success: true,
                id: data._id
            })
        }
    })
})

productsRouter.get(`/findDetail/:id`, (req, res) => {
    productsModel.findById(req.params.id, (error, data) => {
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

productsRouter.get(`/findFlashSale`, (req, res) => {
    productsModel.find({ kind: "flash sale" }, (error, data) => {
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

productsRouter.get(`/findNoiBat`, (req, res) => {
    productsModel.find({ kind: "nổi bật" }, (error, data) => {
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

productsRouter.get(`/findChildren`, (req, res) => {
    productsModel.aggregate([
        {$match:{kind: "thiếu nhi"}},{$sample:{size:3}},
    ]).exec((error, data) => {
        if (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
        else {
            res.json({
                success: true,
                ...data._doc,
                data: data,
            });
        }
    });
})

productsRouter.get(`/findEmotion`, (req, res) => {
    productsModel.aggregate([
        {$match:{kind: "tâm lí"}},{$sample:{size:3}},
    ]).exec((error, data) => {
        if (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
        else {
            res.json({
                success: true,
                ...data._doc,
                data: data,
            });
        }
    });
})

productsRouter.put(`/delete/:title`,(req,res)=>{
    productsModel.findOneAndDelete({title: req.params.title},(error,data)=>{
        if (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
        else {
            res.status(200).json({
                success: true,
                message:'Delete success'
            })
        }
    })
})

module.exports = productsRouter;