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
                const button = document.getElementById('yes');
                button.addEventListener('click',()=>{
                    window.location.assign(`http://localhost:3000/create-question/${data.id}`);
                    fetch(`/true`,{
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json',
                        },
                        body: JSON.stringify({
                            Id: data.id,
                            like: ++data.like,
                        }),
                    });
                });

                }
            
            else{
                window.alert(data.message);
                console.log(data);
            }
        })
        .catch((error)=>{
            window.alert(error.message);
        })
}