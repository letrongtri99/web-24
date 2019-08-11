const express = require('express');
const postModel = require('./posts.model');
const postRouter = express.Router();

postRouter.post(`/create`,(req,res)=>{
    //check user login?
    if(req.session.currentUser && req.session.currentUser._id){
        const newPost ={
            content: req.body.content,
            imageUrl: req.body.imageUrl,
            author : req.session.currentUser._id,
        }
        postModel.create(newPost,(error,data)=>{
            if(error){
                res.status(500).json({
                    success:false,
                    message:error.message
                })
            }
            else{
                res.status(201).json({
                    success:true,
                    data:data
                })
            }
        })
    }
    else{
        res.status(403).json({
            success:false,
            message:'Unauthenticated'
        })
    }
})

postRouter.get(`/get/:postId`,(req,res)=>{
    postModel.findById(req.params.postId).populate('author','email fullName').exec((error,data)=>{
        if(error){
            res.status(500).json({
                success:false,
                message:error.message
            })
        }
        else{
            res.status(200).json({
                success:true,
                data:data
            })
        }
    });
    
});

postRouter.get(`/getAll/:authorId`,(req,res)=>{
    postModel.find({author:req.params.authorId}).populate('author','email fullName').exec((error,data)=>{
        if(error){
            res.status(500).json({
                success:false,
                message:error.message
            })
        }
        else{
            res.status(200).json({
                success:true,
                data:data
            })
        }
    })
})
module.exports = postRouter;