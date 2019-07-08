window.onload=()=>{
var xmlhttp = new XMLHttpRequest();
var url = `http://localhost:3000/json`

xmlhttp.onreadystatechange = function() {
        var myArr = JSON.parse(this.responseText);
        myFunction(myArr);
    
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

function myFunction(arr) {
    var out = "";
    var i = Math.floor(Math.random() * arr.length);
    out = arr[i].questioncontent;
    document.getElementById("id01").innerText = out;
    }
}