const express = require('express');
const uploadRouter = express.Router();
const fs = require('fs');
const multer = require('multer');
const upload = multer({
    dest:'public/'
})

uploadRouter.post(`/image`,upload.single('image'),(req,res)=>{
    fs.rename(`public/${req.file.filename}`,`public/${req.file.originalname}`,(error)=>{
        if(error){
            res.status(500).json({
                success:false,
                message:error.message,
            })
        }
        else{
            res.status(201).json({
                success:true,
                data:{
                    imageUrl:`http://localhost:3001/${req.file.originalname}`
                }
            })
        }
    })
})

module.exports = uploadRouter;