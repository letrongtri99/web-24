import React from 'react';
import './Register.css';

class UserScreen extends React.Component {
    componentDidMount(){
        fetch(`http://localhost:3001/users/profile`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res)=>{
            return res.json();
        })
        .then((data)=>{
            console.log(data);
        })
    }
    render() {
        return (
            <div className="container" id="profile">
                <h4 class="card-title mt-3 text-center">User Profile</h4>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Full Name</span>
                    </div>
                    <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"></input>
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" >Email</span>
                    </div>
                    <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"></input>
                </div>
            </div>
        )
    }
}

export default UserScreen;