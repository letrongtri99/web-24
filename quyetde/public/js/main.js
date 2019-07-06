const button = document.getElementById("send");
const text = document.getElementById("text");
const dislay = document.getElementById("display");
text.onkeyup = () => {
    dislay.innerHTML = 200-text.value.length+"/200 kí tự còn lại";
}
button.onclick = () => {
    if(text.value.length === 0){
        alert(`Chưa nhập thông tin`);
    }
    
}