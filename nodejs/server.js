// console.log('Hello World!!!');
// const fs=require('fs');
// const textData = `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`;
// fs.writeFile('text.txt',textData,(error) => {
//     if(error){
//         console.log(error);
//     }
//     else{
//         console.log('Write file success');
//     }
// });
// fs.readFile('text.txt','utf8',(error,data) =>{
//     if(error){
//         console.log(error);
//     }
//     else{
//         console.log(data);
//     }
// });
// //xem khi nao thay doi
// fs.watchFile('text.txt',(current,previous) =>{
//     console.log(`File changed`);
// })
const express = require(`express`);
const path = require('path');
const app = express();
app.use(express.static('public'));

app.get(`/`,(req,res)=>{
    res.send(`Hello World`);
});
app.get('/about',(req,res) =>{
    res.send(`About us`);
});

app.get(`/introduction`,(req,res) =>{
    res.sendFile(path.resolve(__dirname,'./public/index.html'));
});
// app.get('/style.css',(req,res) =>{
//     res.sendFile(path.resolve(__dirname,'./style.css'));
// })

app.listen(3000);