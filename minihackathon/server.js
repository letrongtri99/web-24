const mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost:27017/minihackathon`,
                {useNewUrlParser:true},(e)=>{
                if(e){
                    console.log(e);
                }
                else{
                    console.log('Success');
                    const express = require(`express`);
                    const app = express();
                    const path = require('path');
                    const bodyParser = require('body-parser');
                    const gameModel = require('./model/game.model');
                    app.use(express.static('public'));
                    app.use(bodyParser.json());
                    app.get(`/`,(req,res)=>{
                        res.sendFile(path.resolve(__dirname,'./public/html/indexcreatescreen.html'));
                    });
                    app.get(`/games/:id`,(req,res)=>{
                        res.sendFile(path.resolve(__dirname,'./public/html/indexplayscreen.html'));
                    });
                    app.post(`/create-name`,(req,res)=>{
                        gameModel.create({
                            namePerson:req.body.namePerson,
                        },(error,data)=>{
                            if(error){
                                res.status(500).json({
                                    success:false,
                                    message:error.message,
                                });
                            }
                            else{
                                res.status(201).json({
                                    success:true,
                                    id: data._id,
                                });
                            }
                        });
                    });
                    app.get(`/getname/:id`,(req,res)=>{
                        gameModel.findById(req.params.id,(error,data)=>{
                            if(error){
                                res.status(500).json({
                                    success:false,
                                    message:error.message,
                                });
                            }
                            else{
                                res.status(201).json({
                                    success:true,
                                    data:data,
                                });
                            }
                        });
                    });
                    app.put(`/savehtml`,(req,res)=>{
                        gameModel.findById(req.body.Id,(error,data)=>{
                            data.html= req.body.html;
                            data.times=req.body.times;
                            data.save((error,data2)=>{
                                
                            })
                        });
                    });
                    app.put(`/savescore`,(req,res)=>{
                        gameModel.findById(req.body.Id,(error,data)=>{
                            data.score= req.body.Score;
                            data.save((error,data2)=>{
                                
                            })
                        });
                    });
                    app.get(`/data`,(req,res)=>{
                        res.sendFile(path.resolve(__dirname,'./danhsach.json'));
                    });
                    app.listen(8080);
                }
},);
