const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');
var random = require('mongoose-simple-random');
const questionModel = require('./models/question.model');
mongoose.connect(`mongodb://localhost:27017/quyetde`,
                    {useNewUrlParser:true},
                    (e)=>{
                        if(e){
                            console.log(e);
                        }
                        else{
                            console.log(`Success`);
                            const express = require('express');
                            const app = express();
                            const path = require('path');
                            const bodyParser = require('body-parser');
                            const fs = require('fs');
                            var pass;
                            app.use(express.static('public'));
                            app.use(bodyParser.json());
                            // 
                            app.get(`/me`,(req,res) =>{
                                res.sendFile(path.resolve(__dirname,'./public/html/indexcauhoi.html'));
                            });
                            app.get(`/chinh`,(req,res)=>{
                                res.sendFile(path.resolve(__dirname,'./public/html/index.html'));
                            });
                            app.get(`/timkiem`,(req,res)=>{
                                res.sendFile(path.resolve(__dirname,'./public/html/indextimkiem.html'));
                            });                           
                            app.post(`/create-question`,(req,res) =>{
                                // console.log(req.body);
                                //save question to database
                                //questioncontent
                                //like
                                //dislike
                                //createAt
                                
                                // save newquestion
                                // fs.readFile('./data.json',{encoding:'utf8'},(error,data) =>{
                                //     if(error){
                                //         res.status(500).json({
                                //             success: false,
                                //             message: error.message,
                                //         });
                                //     }
                                //     else{
                                //         const questionList = JSON.parse(data);
                                //         const newQuestionId = new Date().getTime();
                                //         const newQuestion = {
                                //             id: newQuestionId,
                                //             questioncontent : req.body.questionContent,
                                //             like:0,
                                //             dislike:0,
                                //             createAt: new Date().toString(),    
                                //         }
                                //         questionList.push(newQuestion);
                                //         fs.writeFile('./data.json',JSON.stringify(questionList),(error)=>{
                                //             if(error){
                                //                 res.status(500).json({
                                //                     success: false,
                                //                     message: error.message,
                                //                 }); 
                                //             }
                                //             else{
                                //                 res.json({
                                //                     success: true,
                                //                     id: newQuestionId,
                                //                     questioncontent : req.body.questionContent,
                                //                 });
                                //             }
                                //         });
                                //         // app.get(`/create-question/${newQuestionId}`,(req,res)=>{
                                //         //     res.sendFile(path.resolve(__dirname,'./public/html/indexresult.html'));
                                //         // });
                                //     }
                                // });
                                questionModel.create({
                                    questionContent:req.body.questionContent,
                                },(error,data)=>{
                                    if(error){
                                        res.status(500).json({
                                            success:false,
                                            message:error.message,
                                        });
                                    }
                                    else{
                                        // console.log(data);
                                        res.status(201).json({
                                            ///...data lấy tất cả các trường
                                            success:true,
                                            id: data._id,
                                        });
                                    }
                                });  
                            });
                            app.get(`/create/:questionId`,(req,res)=>{
                                res.sendFile(path.resolve(__dirname,'./public/html/indexresult.html'));
                            });
                            app.get(`/getquestion/:questionId`,(req,res)=>{
                                // fs.readFile('./data.json',{encoding:'utf8'},(error,data)=>{
                                //     if(error){
                                //         res.json({
                                //             success:false,
                                //             message:error.message,
                                //         });
                                //     }
                                //     else{
                                //         const questionList = JSON.parse(data);
                                //         let selected;
                                //         for(var i=0;i<questionList.length;i++){
                                //             if(String(questionList[i].id) === req.params.questionId){
                                //                 selected = questionList[i];
                                //                 break;
                                //             }
                                //         }
                                //         res.json({
                                //             success:true,
                                //             data:selected,
                                //         });
                                //     }
                                // });
                                questionModel.findById(req.params.questionId,(error,data)=>{
                                    if(error){
                                        res.json({
                                            success:false,
                                            message:error.message,
                                        });
                                    }
                                    else{
                                        // console.log(data);
                                        res.json({
                                            success:true,
                                            data:data,
                                        });
                                    }
                                });
                            });
                            
                            app.get(`/get-random-question`,(req,res)=>{
                                // fs.readFile('./data.json',{encoding:'utf8'},(error,data)=>{
                                //     if(error){
                                //         res.json({
                                //             success:false,
                                //             message:error.message,
                                //         });
                                //     }
                                //     else{
                                //         const questionList = JSON.parse(data);
                                //         var i = Math.floor(Math.random() * questionList.length);
                                //         res.json({
                                //             success:true,
                                //             data:questionList[i],
                                //         });
                                //     }
                                // });
                                questionModel.findRandom({},{},{limit:1},(error,data)=>{
                                    if(error){
                                        res.json({
                                            success:false,
                                            message: error.message,
                                        });
                                    }
                                    else{
                                        res.json({
                                            success:true,
                                            data:data,   
                                        });
                                    }
                                });
                            });
                            app.put('/vote',(req,res)=>{
                                // fs.readFile('./data.json',{encoding:'utf8'},(error,data)=>{
                                //     if(error){
                                //         res.json({
                                //             success:false,
                                //             message:error.message,
                                //         });
                                //     }
                                //     else{
                                //         const questionList = JSON.parse(data);
                                //         for(var i=0;i<questionList.length;i++){
                                //             if(String(questionList[i].id) === req.body.id){
                                //                 questionList[i][req.body.vote]+=1;
                                //             }
                                //         }
                                //         fs.writeFile('./data.json',JSON.stringify(questionList),(error)=>{
                                //             if(error){
                                //                 res.status(501).json({
                                //                     success: false,
                                //                     message: error.message,
                                //                 }); 
                                //             }
                                //             else{
                                //                 res.json({
                                //                     success: true,
                                //                 });
                                //             }
                                //         });
                                //     }
                                // });
                                questionModel.findOne({_id:req.body.id},(error,data)=>{
                                    data[req.body.vote]+=1;
                                    data.save((error,data2)=>{
                                        if(error){
                                            res.json({
                                                success:false,
                                                message: error.message,
                                            });
                                        }
                                        else{
                                            res.json({
                                                success:true,   
                                            });
                                        }
                                    });
                                });
                            });
                            app.get(`/getfind/:needfind`,(req,res)=>{
                                questionModel.find({questionContent:{"$regex":String(req.params.needfind).toLowerCase()}},(error,data)=>{
                                    if(error){
                                        res.json({
                                            success:false,
                                            message: error.message,
                                        });
                                    }
                                    else{
                                        res.json({
                                            success:true,
                                            data:data,   
                                        });
                                    }
                                });
                            });
                            app.listen(3000);
}
},);

