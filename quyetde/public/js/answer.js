window.onload=()=>{
// var xmlhttp = new XMLHttpRequest();
// var url = `http://localhost:3000/json`

// xmlhttp.onreadystatechange = function() {
//         var myArr = JSON.parse(this.responseText);
//         myFunction(myArr);
    
// };
// xmlhttp.open("GET", url, true);
// xmlhttp.send();

// function myFunction(arr) {
//     var out = "";
//     var i = Math.floor(Math.random() * arr.length);
//     out = arr[i].questioncontent;
//     const button = document.getElementById('yes');
//     document.getElementById("id01").innerText = out;
//     button.onclick = ()=>{
//         arr[i].like=1;;
//     }
//     }
    
    // fetch(`http://localhost:3000/json`)
    //     .then((res) =>{
    //         return res.json();
    //     })
    //     .then((data)=>{
    //         var i = Math.floor(Math.random() * data.length);
    //         document.getElementById("id01").innerText = data[i].questioncontent;
    //     })
    //     .catch((error)=>{
    //         console.log(error);
    //     }); 
    fetch(`/randomquestion`)
        .then((res)=>{
            return res.json();
        })
        .then((data)=>{
            if(data.success){
                console.log(data);
                document.getElementById("id01").innerText=data.questioncontent;
                const button1 = document.getElementById('yes');
                button1.addEventListener('click',()=>{
                    // window.location.assign(`http://localhost:3000/create-question/${data.id}`);
                    fetch(`/true`,{
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json',
                        },
                        body: JSON.stringify({
                            Id: data.id,
                            like: ++data.like,
                        }),
                    })
                    .then((response)=>{
                        return response.json();
                    })
                    .then((data2)=>{
                        if(data2.success){
                            window.location.assign(`http://localhost:3000/create-question/${data.id}`);
                        }
                    })
                });
                const button2 = document.getElementById("no");
                button2.addEventListener('click',()=>{
                    fetch(`/false`,{
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json',
                        },
                        body: JSON.stringify({
                            Id: data.id,
                            dislike: ++data.dislike,
                        }),
                    })
                    .then((responser)=>{
                        return responser.json();
                    })
                    .then((data3)=>{
                        if(data3.success){
                            window.location.assign(`http://localhost:3000/create-question/${data.id}`);
                        }
                    })
                });
                const next = document.getElementById("result");
                next.onclick=()=>{
                    window.location.assign(`http://localhost:3000/create-question/${data.id}`);
                }
            }
            
            else{
                window.alert(data.message);
                console.log(data);
            }
        })
        .catch((error)=>{
            window.alert(error.message);
        })
    const other = document.getElementById("other");
    other.onclick=()=>{
        window.location.reload();
    }
}