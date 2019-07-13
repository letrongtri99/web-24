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
    var selectedQuestion;
    fetch(`/get-random-question`)
        .then((res)=>{
            return res.json();
        })
        .then((data)=>{
            if(data.success){
                console.log(data);
                selectedQuestion = data.data[0];
                document.getElementById("id01").innerText=data.data[0].questionContent;
                const next = document.getElementById("result");
                next.onclick=()=>{
                    window.location.assign(`http://localhost:3000/create/${data.data[0]._id}`);
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
    const voteQuestion =(Vote)=>{
        fetch(`/vote`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                id: selectedQuestion._id,
                vote: Vote,
            }),
        })
            .then((res)=>{
                window.location.assign(`http://localhost:3000/create/${selectedQuestion._id}`);
            })
            .catch((error)=>{
                console.log(error);
            });
    };
    const button1 = document.getElementById('yes');
    button1.addEventListener('click',()=>{
        voteQuestion('like');
    });
    const button2 = document.getElementById("no");
    button2.addEventListener('click',()=>{
        voteQuestion('dislike');
    });
}