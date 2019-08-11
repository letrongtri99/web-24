import React from 'react';
import './Login.css'

class LoginScreen extends React.Component {
    componentDidMount() {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        document.getElementById("exampleInputEmail1").addEventListener('change', (event) => {
            event.preventDefault();
            var text = document.getElementById("exampleInputEmail1").value;
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
        document.getElementById("exampleInputPassword1").addEventListener('input', (event) => {
            event.preventDefault();
            var pass = document.getElementById("exampleInputPassword1").value;
            if (pass.length < 6) {
                document.getElementById("passHelp").innerText = "Password must be at least 6 characters";
            }
            else {
                document.getElementById("passHelp").innerText = "Password is valid";
            }
        });
        document.getElementById("login").addEventListener('submit', (event) => {
            event.preventDefault();
            var email = document.getElementById("exampleInputEmail1").value;
            var passWord = document.getElementById("exampleInputPassword1").value;
            if (email.length === 0 && passWord.length === 0) {
                document.getElementById("emailHelp").innerText = "Please input email";
                document.getElementById("passHelp").innerText = "Please input password";
            }
            else if (email.length === 0) {
                document.getElementById("emailHelp").innerText = "Please input email";
            }
            else if (passWord.length === 0) {
                document.getElementById("passHelp").innerText = "Please input password";
            }
            else {
                fetch(`http://localhost:3001/users/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials:'include',
                    body: JSON.stringify({
                        email: email,
                        passWord: passWord
                    })
                })
                    .then((res) => {
                        return res.json();
                    })
                    .then((data) => {
                        if (!data.success) {
                            document.getElementById("warning").innerText = data.message;
                        }
                        else {
                            document.getElementById("warning").innerText = " ";
                            //save current to localStorage
                            window.localStorage.setItem('email',data.data.email);
                            window.localStorage.setItem('fullName',data.data.fullName);
                            window.location.assign("http://localhost:3000/profile");
                        }
                    });
            }
        });
    }
    render() {
        return (
            <div className="container">
                <h4 class="card-title mt-3 text-center">Login Account</h4>
                <form id="login" >
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
                        <small id="emailHelp" className="form-text text-muted"></small>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"></input>
                        <small id="passHelp" className="form-text text-muted"></small>
                    </div>
                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
                        <label className="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" class="btn btn-primary" >Submit</button>
                    <small id="warning" className="form-text text-muted"></small>
                    <div className="mt-4">
                        <div className="d-flex justify-content-center links">
                            Don't have an account? <a href="http://localhost:3000/register" className="ml-2">Sign Up</a>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default LoginScreen;