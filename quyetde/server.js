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
app.post(`/create-question`,(req,res) =>{
    // console.log(req.body);
    //save question to database
    //questioncontent
    //like
    //dislike
    //createAt
    
    // save newquestion
    fs.readFile('./data.json',{encoding:'utf8'},(error,data) =>{
        if(error){
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
        else{
            const questionList = JSON.parse(data);
            const newQuestionId = new Date().getTime();
            const newQuestion = {
                id: newQuestionId,
                questioncontent : req.body.questionContent,
                like:0,
                dislike:0,
                createAt: new Date().toString(),    
            }
            questionList.push(newQuestion);
            fs.writeFile('./data.json',JSON.stringify(questionList),(error)=>{
                if(error){
                    res.status(500).json({
                        success: false,
                        message: error.message,
                    }); 
                }
                else{
                    res.json({
                        success: true,
                        id: newQuestionId,
                        questioncontent : req.body.questionContent,
                    });
                }
            });
            app.get(`/create-question/${newQuestionId}`,(req,res)=>{
                res.sendFile(path.resolve(__dirname,'./public/html/indexresult.html'));
            });
        }
    });
});
app.get(`/randomquestion`,(req,res) =>{
    fs.readFile('./data.json',{encoding:'utf8'},(error,data)=>{
        if(error){
            res.json({
                success:false,
                message:error.message,
            });
        }
        else{
            const questionList = JSON.parse(data);
            var i = Math.floor(Math.random() * questionList.length);
            res.json({
                success:true,
                questioncontent: questionList[i].questioncontent,
                id:questionList[i].id,
                like:questionList[i].like,
                dislike:questionList[i].dislike,
            });
        }
    });
});
app.post(`/resultquestion`,(req,res)=>{
    pass = req.body.Id;
    fs.readFile('./data.json',{encoding:'utf8'},(error,data)=>{
        if(error){
            res.json({
                success:false,
                message:error.message,
            });
        }
        else{
            const questionList = JSON.parse(data);
            for(var i=0;i<questionList.length;i++){
                if(questionList[i].id == pass){
                    res.json({
                        success:true,
                        questioncontent: questionList[i].questioncontent,
                        like:questionList[i].like,
                        dislike:questionList[i].dislike,
                    });
                }
            }
        }
    });
});
app.post(`/true`,(req,res)=>{
    fs.readFile('./data.json',{encoding:'utf8'},(error,data)=>{
        if(error){
            res.json({
                success:false,
                message:error.message,
            });
        }
        else{
            const questionList = JSON.parse(data);
            for(var i=0;i<questionList.length;i++){
                if(questionList[i].id == req.body.Id){
                    questionList[i].like = req.body.like;
                }
            }
            fs.writeFile('./data.json',JSON.stringify(questionList),(error)=>{
                if(error){
                    res.status(501).json({
                        success: false,
                        message: error.message,
                    }); 
                }
                else{
                    res.json({
                        success: true,
                        id:req.body.Id,
                    });
                }
            });
        }
    });
});
app.post(`/false`,(req,res)=>{
    fs.readFile('./data.json',{encoding:'utf8'},(error,data)=>{
        if(error){
            res.json({
                success:false,
                message:error.message,
            });
        }
        else{
            const questionList = JSON.parse(data);
            for(var i=0;i<questionList.length;i++){
                if(questionList[i].id == req.body.Id){
                    questionList[i].dislike = req.body.dislike;   
                }
            }
            fs.writeFile('./data.json',JSON.stringify(questionList),(error)=>{
                if(error){
                    res.status(501).json({
                        success: false,
                        message: error.message,
                    }); 
                }
                else{
                    res.json({
                        success: true,
                        id:req.body.Id,
                    });
                }
            });
        }
    });
});
app.get(`/json`,(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./data.json'));
});

app.listen(3000);