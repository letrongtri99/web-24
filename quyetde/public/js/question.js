window.onload= ()=>{
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf('/') + 1);
    // var xmlhttp = new XMLHttpRequest();
    // var Url = `http://localhost:3000/json`

    // xmlhttp.onreadystatechange = function() {
    //     var myArr = JSON.parse(this.responseText);
    //     myFunction(myArr);
    
    // };
    // xmlhttp.open("GET", Url, true);
    // xmlhttp.send();

    // function myFunction(arr) {
    //     var out = "";
    //     for(var i=0;i<arr.length;i++){
    //         if(arr[i].id == id){
    //             out = arr[i].questioncontent;
    //         }
    //     }
    //     document.getElementById("question").innerText = out;
    // }
    // fetch(`http://localhost:3000/json`)
    // .then((res) =>{
    //     return res.json();
    // })
    // .then((data)=>{
    //     for(var i=0;i<data.length;i++){
    //         if(data[i].id == id){
    //             document.getElementById("question").innerText = data[i].questioncontent;
    //             document.getElementById("vote").innerText = data[i].like;
    //         }
    //     }
    // })
    // .catch((error)=>{
    //     console.log(error);
    // });
    fetch(`/resultquestion`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            Id:id,
        }),
    })
        .then((res)=>{
            return res.json();
        })
        .then((data)=>{
            console.log(data);
            document.getElementById("question").innerText = data.questioncontent;
            document.getElementById("vote").innerText = data.like;
        })
}
