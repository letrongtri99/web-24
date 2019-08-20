const express = require('express');
const postModel = require('./posts.model');
const postRouter = express.Router();

postRouter.get(`/`, (req, res) => {
    //sorBy:price
    //sortOrder:a-z
    const pageNumber = Number(req.query.pageNumber);
    const pageSize = Number(req.query.pageSize);
    if (isNaN(pageNumber) || isNaN(pageSize)) {
        res.status(500).json({
            success: false,
            message: 'pageNumber and pageSize are invalid'
        })
    }
    else if (pageNumber < 1 || pageSize < 1 || pageSize > 20) {
        res.status(500).json({
            success: false,
            message: 'pageNumber and pageSize are invalid'
        })
    }
    else {
        postModel.find({})
            .sort({ createAt: -1 })
            .skip(pageSize * (pageNumber - 1))
            .limit(pageSize)
            .exec((error, data) => {
                if(error){
                    res.status(500).json({
                        success: false,
                        message: error.message
                    })
                }
                else{
                    postModel.find({}).countDocuments().exec((error,total)=>{
                        if(error){
                            res.status(500).json({
                                success: false,
                                message: error.message
                            })
                        }
                        else{
                            res.status(200).json({
                                success:false,
                                data:data,
                                total:total
                            })
                        }
                    })
                }
            })
    }
})

postRouter.post(`/create`, (req, res) => {
    //check user login?
    if (req.session.currentUser && req.session.currentUser._id) {
        const newPost = {
            content: req.body.content,
            imageUrl: req.body.imageUrl,
            author: req.session.currentUser._id,
        }
        postModel.create(newPost, (error, data) => {
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
    }
    else {
        res.status(403).json({
            success: false,
            message: 'Unauthenticated'
        })
    }
})

postRouter.get(`/get/:postId`, (req, res) => {
    postModel.findById(req.params.postId).populate('author', 'email fullName').exec((error, data) => {
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
    });

});

postRouter.get(`/getAll/:authorId`, (req, res) => {
    postModel.find({ author: req.params.authorId }).populate('author', 'email fullName').exec((error, data) => {
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
module.exports = postRouter;