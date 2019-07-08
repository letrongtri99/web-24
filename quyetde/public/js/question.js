window.onload= ()=>{
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf('/') + 1);
    var xmlhttp = new XMLHttpRequest();
    var Url = `http://localhost:3000/json`

    xmlhttp.onreadystatechange = function() {
        var myArr = JSON.parse(this.responseText);
        myFunction(myArr);
    
    };
    xmlhttp.open("GET", Url, true);
    xmlhttp.send();

    function myFunction(arr) {
        var out = "";
        for(var i=0;i<arr.length;i++){
            if(arr[i].id == id){
                out = arr[i].questioncontent;
            }
        }
        document.getElementById("question").innerText = out;
    }
}
