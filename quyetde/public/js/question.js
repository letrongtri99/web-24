window.onload= ()=>{
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf('/') + 1);
    console.log(id);
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
    // fetch(`/resultquestion`,{
    //     method:'POST',
    //     headers:{
    //         'Content-Type':'application/json',
    //     },
    //     body:JSON.stringify({
    //         Id:id,
    //     }),
    // })
    //     .then((res)=>{
    //         return res.json();
    //     })
    //     .then((data)=>{
    //         console.log(data);
    //         document.getElementById("question").innerText = data.questioncontent;
    //         document.getElementById("vote").innerText = data.like+" like";
    //         document.getElementById("dis").innerText = data.dislike+" dislike";
    //     });
    const change = document.getElementById("another");
    change.addEventListener('click',()=>{
        window.location.assign(`http://localhost:3000/chinh`);
    });
    fetch(`/getquestion/${id}`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
        },
    })
        .then((res)=>{
            return res.json();
        })
        .then((data)=>{
            console.log(data);
            if(data.data){
                document.getElementById("question").innerText = data.data.questionContent;
                document.getElementById("vote").innerText = data.data.like+" like";
                document.getElementById("dis").innerText = data.data.dislike+" dislike";
                let likePercent = 0;
                let dislikePercent = 0;
                if(likePercent ===0 && dislikePercent ===0){
                    likePercent=50;
                    dislikePercent=50;
                }else{
                    likePercent = (data.data.like/(data.data.dislike+data.data.like)).toFixed(2);
                    dislikePercent = 100 - Number(likePercent);
                }
            }
            else{
                window.alert('Question not found');
            }
        });
}
