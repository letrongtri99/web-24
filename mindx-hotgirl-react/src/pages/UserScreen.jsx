import React from 'react';
import './Register.css';

class UserScreen extends React.Component {
    state = {
        pageNumber: 1,
        pageSize: 5,
        data: [],
        total: 0
    }
    handlePaginationClick = (event) => {
        console.log(event.target.innerText);
        this.setState({
            pageNumber: Number(event.target.innerText)
        })
        fetch(`http://localhost:3001/posts?pageNumber=${event.target.innerText}&pageSize=${this.state.pageSize}`, {
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
                this.setState({
                    data: data.data,
                    total: data.total
                })
            })
    }
    handlePreviousClick = (event) => {
        if (this.state.pageNumber != 1) {
            this.setState({
                pageNumber: this.state.pageNumber -= 1
            })
            fetch(`http://localhost:3001/posts?pageNumber=${this.state.pageNumber}&pageSize=${this.state.pageSize}`, {
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
                    this.setState({
                        data: data.data,
                        total: data.total
                    })
                })
        }
    }
    handleNextClick = (event) => {
        if (this.state.pageNumber != Math.ceil(this.state.total / this.state.pageSize)) {
            this.setState({
                pageNumber: this.state.pageNumber += 1
            })
            fetch(`http://localhost:3001/posts?pageNumber=${this.state.pageNumber}&pageSize=${this.state.pageSize}`, {
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
                    this.setState({
                        data: data.data,
                        total: data.total
                    })
                })
        }
    }
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
                    fetch(`http://localhost:3001/posts?pageNumber=${this.state.pageNumber}&pageSize=${this.state.pageSize}`, {
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
                            console.log(data);
                            this.setState({
                                data: data.data,
                                total: data.total
                            })
                        })
                    // fetch(`http://localhost:3001/posts/getAll/${data.data._id}`, {
                    //     method: 'GET',
                    //     headers: {
                    //         'Content-Type': 'application/json',
                    //     },
                    //     credentials: 'include',
                    // })
                    //     .then((res) => {
                    //         return res.json();
                    //     })
                    //     .then((data) => {
                    //         const body = document.getElementById("profile");
                    //         for (var i = 0; i < data.data.length; i++) {
                    //             body.insertAdjacentHTML(
                    //                 `beforeend`,
                    //                 `<div class="card" style="width: 18rem;">
                    //                 <img src="${data.data[i].imageUrl}" class="card-img-top" >
                    //                 <div class="card-body">
                    //                     <h5 class="card-title">${data.data[i].author.fullName}</h5>
                    //                     <p class="card-text">${data.data[i].content}</p>
                    //                 </div>
                    //             </div>`
                    //             )
                    //         }
                    //     })
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

    }
    render() {
        const myArray = [];
        for (let i = 0; i < Math.ceil(this.state.total / this.state.pageSize); i += 1) {
            myArray.push(i)
        }
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
                <div className="result" >
                    {this.state.data.map((item) => {
                        return (
                            <div className="card" key={item._id} >
                                <img className="card-img-top" src={item.imageUrl} ></img>
                                <div class="card-body">
                                    <p class="card-text">{item.content}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <nav className="mt-4" aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item">
                            <a class="page-link" onClick={this.handlePreviousClick} aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span class="sr-only">Previous</span>
                            </a>
                        </li>
                        {myArray.map((item) => {
                            return (
                                <li className={this.state.pageNumber === item + 1 ? "page-item active" : "page-item"}>
                                    <a className="page-link" onClick={this.handlePaginationClick}>{item + 1}</a>
                                </li>
                            )
                        })}
                        <li class="page-item">
                            <a class="page-link" onClick={this.handleNextClick} aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                                <span class="sr-only">Next</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}
export default UserScreen;