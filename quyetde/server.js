const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

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
            })
        }
    });
});
app.get(`/json`,(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./data.json'));
});

app.listen(3000);