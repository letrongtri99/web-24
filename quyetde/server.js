const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('public'));

// 
app.get(`/me`,(req,res) =>{
    res.sendFile(path.resolve(__dirname,'./public/html/indexcauhoi.html'));
});
app.get(`/chinh`,(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./public/html/index.html'));
})
app.listen(3000);