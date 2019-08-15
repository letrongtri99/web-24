import React from 'react';
import './Register.css';

class UserScreen extends React.Component {
    componentDidMount() {
        const imageRegex = /(https?:\/\/.*\.(?:png|jpg))/i;
        fetch(`http://localhost:3001/users/profile`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (!data.success) {
                    window.location.assign("http://localhost:3000/login");
                }
                else {
                    document.getElementById("mail").value = window.localStorage.getItem('email');
                    document.getElementById("fullname").value = window.localStorage.getItem('fullName');
                    fetch(`http://localhost:3001/posts/getAll/${data.data._id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include',
                    })
                        .then((res) => {
                            return res.json();
                        })
                        .then((data) => {
                            const body = document.getElementById("profile");
                            for (var i = 0; i < data.data.length; i++) {
                                body.insertAdjacentHTML(
                                    `beforeend`,
                                    `<div class="card" style="width: 18rem;">
                                    <img src="${data.data[i].imageUrl}" class="card-img-top" >
                                    <div class="card-body">
                                        <h5 class="card-title">${data.data[i].author.fullName}</h5>
                                        <p class="card-text">${data.data[i].content}</p>
                                    </div>
                                </div>`
                                )
                            }
                        })
                }
            })
        document.getElementById("logout").addEventListener('click', (event) => {
            event.preventDefault();
            fetch(`http://localhost:3001/users/logout`, {
                method: 'GET',
                credentials: 'include',
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    window.localStorage.removeItem('email');
                    window.localStorage.removeItem('fullName');
                    window.location.assign("http://localhost:3000/login");
                })
        })

        document.getElementById("create").addEventListener('click', (event) => {
            const content = document.getElementById("content").value;
            const url = document.getElementById("url").value;
            if (content === "" || url === "") {
                document.getElementById("help").innerText = "Please input enough detail"
            }
            else if (!imageRegex.test(url)) {
                document.getElementById("help").innerText = "Invalid image URL"
            }
            else {
                document.getElementById("create").setAttribute("data-dismiss","modal");
                fetch(`http://localhost:3001/posts/create`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        content: content,
                        imageUrl: url
                    })
                })
                    .then((res) => {
                        return res.json();
                    })
                    .then((data) => {
                        if (data.success) {
                            fetch(`http://localhost:3001/posts/get/${data.data._id}`, {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                credentials: 'include',
                            })
                                .then((res) => {
                                    return res.json();
                                })
                                .then((data) => {
                                    const body = document.getElementById("profile");
                                    body.insertAdjacentHTML(
                                        `beforeend`,
                                        `<div class="card" style="width: 18rem;">
                                <img src="${data.data.imageUrl}" class="card-img-top" >
                                <div class="card-body">
                                    <h5 class="card-title">${data.data.author.fullName}</h5>
                                    <p class="card-text">${data.data.content}</p>
                                </div>
                            </div>`
                                    )
                                })
                            window.alert('Create success');
                        }
                        else {
                            window.alert('Create failed');
                        }
                    });
            }
        })
    }
    render() {
        return (
            <div className="container" id="profile">
                <h4 className="card-title mt-3 text-center">User Profile</h4>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span class="input-group-text">Full Name</span>
                    </div>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" id="fullname"></input>
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" >Email</span>
                    </div>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" id="mail"></input>
                </div>
                <button id="logout">Log out</button><br></br>
                <a className="btn btn-outline-primary" href="/create-post">New Post</a>
                <a className="btn btn-outline-primary" href="/uploadprofile">Upload Profile</a>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">Create Information</button>
                <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span class="input-group-text">Content</span>
                                    </div>
                                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" id="content"></input>
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span class="input-group-text">Image Url</span>
                                    </div>
                                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" id="url"></input>
                                </div>
                            </div>
                            <small id="help" className="form-text text-muted"></small>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" id="create">Create Card</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default UserScreen;