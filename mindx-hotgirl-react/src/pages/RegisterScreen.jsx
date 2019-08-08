import React from 'react';
import './Register.css'
class RegisterScreen extends React.Component {
    componentDidMount(){
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        document.getElementById("inputFullName").addEventListener('input',(event)=>{
            event.preventDefault();
            document.getElementById("resultHelp").innerText=" ";
        })
        document.getElementById("inputEmail").addEventListener('input', (event) => {
            event.preventDefault();
            document.getElementById("resultHelp").innerText=" ";
            var text = document.getElementById("inputEmail").value;
            if (text.length === 0) {
                document.getElementById("emailHelp").innerText = "Please input email";
            }
            else if (!emailRegex.test(text)) {
                document.getElementById("emailHelp").innerText = "Invalid email";
            }
            else {
                document.getElementById("emailHelp").innerText = "Valid email";
            }
        });
        document.getElementById("inputPassword").addEventListener('input', (event) => {
            event.preventDefault();
            document.getElementById("resultHelp").innerText=" ";
            var pass = document.getElementById("inputPassword").value;
            if (pass.length < 6) {
                document.getElementById("passHelp").innerText = "Password must be at least 6 characters";
            }
            else {
                document.getElementById("passHelp").innerText = "Password is valid";
            }
        });
        document.getElementById("inputRepeatPassword").addEventListener('input', (event) => {
            event.preventDefault();
            document.getElementById("resultHelp").innerText=" ";
            var pass = document.getElementById("inputRepeatPassword").value;
            if (pass.length < 6) {
                document.getElementById("passRepeatHelp").innerText = "Password must be at least 6 characters";
            }
            else if(pass !== document.getElementById("inputPassword").value) {
                document.getElementById("passRepeatHelp").innerText = "Password is not similar";
            }
            else{
                document.getElementById("passRepeatHelp").innerText = "Password is valid";
            }
        });
        document.getElementById("register").addEventListener('submit',(event)=>{
            event.preventDefault();
            const mail = document.getElementById("inputEmail").value;
            const password = document.getElementById("inputPassword").value;
            const repeatpassword = document.getElementById("inputRepeatPassword").value;
            const fullname = document.getElementById("inputFullName").value;
            if(mail.length ===0 || password.length===0 || repeatpassword.length ===0 || fullname.length ===0 ){
                document.getElementById("resultHelp").innerText="No enough information";
            }
            else{
                fetch(`http://localhost:3001/users/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: mail,
                        passWord: password,
                        fullName: fullname
                    })
                })
                .then((res)=>{
                    return res.json();
                })
                .then((data)=>{
                    if(data.success){
                        document.getElementById("resultHelp").innerText="Register success";
                    }
                    else{
                        document.getElementById("resultHelp").innerText=data.message;
                    }
                });
            }
        });
    }
    render() {
        return (
            <div className="container">
                <div className="card bg-light">
                    <article class="card-body mx-auto">
                        <h4 class="card-title mt-3 text-center">Create Account</h4>
                        <p class="text-center">Get started with your free account</p>
                        <form id="register"> 
                            <div class="form-group input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"> <i class="fa fa-user"></i> </span>
                                </div>
                                <input name="" class="form-control" placeholder="Full name" type="text" id="inputFullName"></input>
                            </div>
                            <small id="fullNameHelp" className="form-text text-muted"></small>
                            <div class="form-group input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"> <i class="fa fa-envelope"></i> </span>
                                </div>
                                <input name="" class="form-control" placeholder="Email address" type="email" id="inputEmail"></input>
                            </div>
                            <small id="emailHelp" className="form-text text-muted"></small>
                            <div class="form-group input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
                                </div>
                                <input class="form-control" placeholder="Create password" type="password" id="inputPassword"></input>
                            </div>
                            <small id="passHelp" className="form-text text-muted"></small>
                            <div class="form-group input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
                                </div>
                                <input class="form-control" placeholder="Repeat password" type="password" id="inputRepeatPassword"></input>
                            </div>
                            <small id="passRepeatHelp" className="form-text text-muted"></small>
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary btn-block"> Create Account  </button>
                            </div>
                            <small id="resultHelp" className="form-text text-muted"></small>
                            <p class="text-center">Have an account? <a href="http://localhost:3000/login">Log In</a> </p>
                        </form>
                    </article>
                </div>
            </div>
        );
    }
}

export default RegisterScreen;