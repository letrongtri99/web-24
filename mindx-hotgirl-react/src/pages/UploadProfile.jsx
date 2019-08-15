import React from 'react';

class UploadProfile extends React.Component {
    state = {
        imageFile: undefined,
        imageSrc: '',
        errorMessage: '',
        address: '',
        fullname: '',
        date: ''
    }
    handleChangeFile = (event) => {
        console.log(event.target.files[0]);
        this.setState({
            imageSrc: ''
        })
        const imageRegex = (/\.(gif|jpg|jpeg|tiff|png)$/i);
        const imageFile = event.target.files[0];
        if (!imageRegex.test(imageFile.name)) {
            document.getElementById("imgHelp").innerHTML = "Not image";
        }
        else if (imageFile.size > 400000) {
            document.getElementById("imgHelp").innerHTML = "Too big";
        }
        else {
            document.getElementById("imgHelp").innerHTML = " ";
            const fileReader = new FileReader();
            fileReader.readAsDataURL(imageFile);
            fileReader.onloadend = ((data) => {
                this.setState({
                    imageFile: imageFile,
                    imageSrc: data.currentTarget.result,
                })
            });
        }
    }
    handleAddressChange = (event) => {
        this.setState({
            address: event.target.value
        })
    }
    handleFullName = (event) => {
        this.setState({
            fullname: event.target.value
        })
    }
    handleChangeDate=(event)=>{
        console.log(event.target.value);
    }
    handleFormSubmit = (event) => {
        event.preventDefault();
        if (!this.state.imageFile || !this.state.address || !this.state.fullname) {
            this.setState({
                errorMessage: 'Please input enough details'
            })
        }
        else {
            this.setState({
                errorMessage: ''
            });
            //upload image
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
                    if(!data.success){
                        window.location.assign('http://localhost:3000/login');
                    }
                    else{
                    var id = data.data._id;
                    const formData = new FormData();
                    formData.append('image', this.state.imageFile)
                    var img = '';
                    fetch(`http://localhost:3001/uploads/image`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            // 'Content-Type': 'multipart/form-data'
                        },
                        credentials: 'include',
                        body: formData
                    })
                        .then((res) => {
                            return res.json();
                        })
                        .then((data) => {
                            console.log(data);
                            img = data.data.imageUrl;
                            fetch(`http://localhost:3001/users/update`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                credentials: 'include',
                                body: JSON.stringify({
                                    id:id,
                                    imageUrl: img,
                                    address:this.state.address,
                                    fullname:this.state.fullname
                                })
                            })
                                .then((res) => {
                                    return res.json();
                                })
                                .then((data) => {
                                    if (data.success) {
                                        window.alert('Update success');
                                    }
                                    else {
                                        window.alert('Update failed');
                                    }
                                })
                        })
                        .catch((error) => {
                            this.setState({
                                errorMessage: error.message
                            })
                        })
                    }
                })


        }
    }
    render() {
        return (
            <div className='row'>
                <div className='col-2'></div>
                <div className='col-8'>
                    <form onSubmit={this.handleFormSubmit}>
                        <div className="form-group">
                            <div >
                                Select Avatar
                            </div>
                            <input type="file" className="form-control" style={{ color: 'transparent', margin: "0 auto", textIndent: "-999em" }} onChange={this.handleChangeFile}></input>
                            <div id="imgHelp"></div>
                            {this.state.imageSrc ? (
                                <div>
                                    <img src={this.state.imageSrc} alt='preview'></img>
                                </div>) : null}
                        </div>
                        <div className="form-group">
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="2" placeholder="Please input address" value={this.state.address} onChange={this.handleAddressChange}></textarea>
                        </div>
                        <div className="form-group">
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="1" placeholder="Please input fullname" value={this.state.fullname} onChange={this.handleFullName}></textarea>
                        </div>
                        <div className="form-group">
                            <input type="date" className="form-control" value={this.state.date} onChange={this.handleChangeDate}></input>
                        </div>
                        <div>
                            {this.state.errorMessage}
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btn btn-primary" value="Update"></input>
                        </div>
                    </form>

                </div>
                <div className='col-2'></div>
            </div>
        )
    }
}

export default UploadProfile;