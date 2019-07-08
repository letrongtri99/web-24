window.onload = () =>{
    //document.querySelector(`#send`)

    const button = document.getElementById("send");
    const text = document.getElementById("text");
    const dislay = document.getElementById("display");
    if(text){
    text.addEventListener('input',(event) =>{
        console.log('Content change');
        //innerHTML cả cục Html
        dislay.innerText = 200-text.value.length+"/200 kí tự còn lại";
    });    
    // text.onkeyup = () => {
    //     dislay.innerHTML = 200-text.value.length+"/200 kí tự còn lại";
    // }
    // text.onkeypress = () =>{
    //     if(text.value.length>199){
    //         return false;
    //     }
    // }
}
    button.onclick = () => {
        if(text.value.length === 0){
            // alert(`Chưa nhập thông tin`);
            var input = document.getElementById(`input-container`);
            const alert = document.getElementById(`error`);
            if(!alert){
                input.insertAdjacentHTML(
                    `beforeend`,
                    `<div id='error'>Chưa nhập thông tin</div>`
                );
            }
            
        }
        else{
            //send question to server
            //url params 
            //url query
            //gui bang body
            const content = text.value;
            // fetch(`/create-question/${content}/20190707`,{
            //     method:'POST' //CACH 1 dung url cach 2 dung body
                
            // })
            // fetch(`/create-question?content=${content}`,{
            //     method:'POST',
            // })
            fetch(`/create-question`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    questionContent: content,
                }),
            })
                .then((res) => {
                    return res.json();
                }) //dau vao cai thu hai
                .then((data)=>{
                    if(data.success){
                        //window.location
                        console.log(data);
                        window.location.assign(`http://localhost:3000/create-question/${data.id}`);
                    }else{
                        window.alert(data.message);
                    }
                })
                .catch((errosr) =>{
                    console.log(error);
                    window.alert(error.message);
                });
                 
        }
    }
    
};
