window.onload=()=>{
    const button = document.getElementById("new");
    const name = document.getElementsByClassName("form-control");
    console.log(name);
    button.addEventListener('click',(event)=>{
        const x=[];
        for(var i=0;i<name.length;i++){
            x.push(name[i].value);
        }
        console.log(x);
        fetch(`/create-name`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                namePerson:x,
            }),
        })
            .then((res)=>{
                return res.json();
            })
            .then((data)=>{
                window.location.assign(`http://localhost:8080/games/${data.id}`);
            })
    });
}