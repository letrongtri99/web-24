import React from 'react';

class CreatePost extends React.Component {
    state = {
        imageFile: undefined,
        imageSrc: '',
        content: '',
        errorMessage: ''
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
    handleContentChange = (event) => {
        this.setState({
            content: event.target.value
        })
    }
    handleFormSubmit = (event) => {
        event.preventDefault();
        if (!this.state.imageFile || !this.state.content) {
            this.setState({
                errorMessage: 'Please input content and select image'
            })
        }
        else {
            this.setState({
                errorMessage: ''
            });
            //upload image
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
                    fetch(`http://localhost:3001/posts/create`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include',
                        body: JSON.stringify({
                            content: this.state.content,
                            imageUrl: img
                        })
                    })
                    .then((res)=>{
                        return res.json();
                    })
                    .then((data)=>{
                        if(data.success){
                            window.alert('Create success');
                        }
                        else{
                            window.alert('Create failed');
                        }
                    })
                })
                .catch((error) => {
                    this.setState({
                        errorMessage: error.message
                    })
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
                                Select Image
                            </div>
                            <input type="file" className="form-control" style={{ color: 'transparent', margin: "0 auto", textIndent: "-999em" }} onChange={this.handleChangeFile}></input>
                            <div id="imgHelp"></div>
                            {this.state.imageSrc ? (
                                <div>
                                    <img src={this.state.imageSrc} alt='preview'></img>
                                </div>) : null}
                        </div>
                        <div className="form-group">
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="4" placeholder="Please input content" value={this.state.content} onChange={this.handleContentChange}></textarea>
                        </div>
                        <div>
                            {this.state.errorMessage}
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btn btn-primary" value="Create Post"></input>
                        </div>
                    </form>

                </div>
                <div className='col-2'></div>
            </div>
        )
    }
}

export default CreatePost;

