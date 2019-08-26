import React from 'react';
import './Main.css';
import './GioiThieu.css';
class DangKy extends React.Component {
    state = {
        fullName: '',
        email: '',
        passWord: '',
        role: 'Người Mua',
        repeatPass: '',
        full: '',
        roles: ''
    }
    handleLogOut = (event) => {
        if (this.state.role === 'users') {
            fetch('http://localhost:3001/users/logout', {
                method: 'GET',
                credentials: 'include',
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    // clear window.localStorage
                    window.localStorage.removeItem('role');
                    window.localStorage.removeItem('fullName');
                    window.localStorage.removeItem('email');
                    window.sessionStorage.removeItem('role');
                    window.sessionStorage.removeItem('fullName');
                    window.sessionStorage.removeItem('email');
                    // clear fullname + email in state
                    this.setState({
                        currentUser: {
                            full: '',
                            roles: ''
                        },
                    });
                })
        }
        else if (this.state.role === 'admin') {
            fetch('http://localhost:3001/admin/logout', {
                method: 'GET',
                credentials: 'include',
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    // clear window.localStorage
                    window.localStorage.removeItem('role');
                    window.localStorage.removeItem('fullName');
                    window.localStorage.removeItem('email');
                    window.sessionStorage.removeItem('role');
                    window.sessionStorage.removeItem('fullName');
                    window.sessionStorage.removeItem('email');
                    // clear fullname + email in state
                    this.setState({
                        currentUser: {
                            full: '',
                            roles: ''
                        },
                    });
                })
        }
    }
    componentDidMount() {
        const fullName = window.localStorage.getItem('fullName');
        const role = window.localStorage.getItem('role');
        if (fullName && role) {
            this.setState({
                full: fullName,
                roles: role
            })
        }
        else{
            this.setState({
                full: window.sessionStorage.getItem('fullName'),
                roles: window.sessionStorage.getItem('role')
            })
        }
    }
    handleOption = (event) => {
        this.setState({
            role: event.target.value
        })
    }
    handleEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    handleFullName = (event) => {
        this.setState({
            fullName: event.target.value
        })
    }
    handlePassword = (event) => {
        this.setState({
            passWord: event.target.value
        })
    }
    handleRepeat = (event) => {
        this.setState({
            repeatPass: event.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.role);
        if (this.state.role === 'Người Mua') {
            fetch(`http://localhost:3001/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    email: this.state.email,
                    passWord: this.state.passWord,
                    fullName: this.state.fullName
                }),
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    if (data.success) {
                        document.getElementById("resultHelp").innerText = "Register success";
                    }
                    else {
                        document.getElementById("resultHelp").innerText = data.message;
                    }
                });
        }
        else if (this.state.role === 'Người Bán') {
            fetch(`http://localhost:3001/admin/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    email: this.state.email,
                    passWord: this.state.passWord,
                    fullName: this.state.fullName
                })
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    if (data.success) {
                        document.getElementById("resultHelp").innerText = "Register success";
                    }
                    else {
                        document.getElementById("resultHelp").innerText = data.message;
                    }
                });
        }
    }

    render() {
        return (
            <div id="menu">
                <header>
                    <div className="login">
                        {
                            this.state.full ? (<div>
                                <a href="" style={{marginRight:"2px"}}>Chào Mừng {this.state.full}</a>
                                <a style={{ marginRight: "2px" }}>Vai Trò: {this.state.role}</a>
                                <a href="" style={{marginRight:"2px"}} onClick={this.handleLogOut}>Đăng Xuất</a>
                                <a href="http://localhost:3000/dangky">Đăng Kí</a>
                            </div>
                            )
                                :
                                (<div><a style={{marginRight:"5px"}} href="http://localhost:3000/dangky">Đăng Kí</a>
                                    <a href="http://localhost:3000/dangnhap">Đăng Nhập</a></div>)
                        }
                    </div>
                    <img src='http://giasuttv.net/wp-content/uploads/2014/10/nhung-cuon-sach-hay-nen-doc.jpg' alt=" " width="972px" height="250px" />
                </header>
                <br />
                <nav>
                    <ul class="bang">
                        <li><a href="http://localhost:3000"> TRANG CHỦ</a></li>
                        <li><a href="http://localhost:3000/gioithieu">GIỚI THIỆU</a></li>
                        <li><a href="#" >TIN SÁCH</a>
                            <ul>
                                <li><a href="http://localhost:3000/tinsachtrongnuoc">TRONG NƯỚC</a></li>
                                <li><a href="http://localhost:3000/tinsachnuocngoai">NƯỚC NGOÀI</a></li>
                            </ul>
                        </li>
                        <li><a href="http://localhost:3000/huongdan">HƯỚNG DẪN MUA HÀNG</a></li>
                        {this.state.role === 'users'? <li><a href="http://localhost:3000/lienhe">LIÊN HỆ</a></li>:null}
                        {this.state.roles === 'admin'? <li><a href="http://localhost:3000/danghang">ĐĂNG HÀNG</a></li>:null}
                        {this.state.role ? <li><a href="http://localhost:3000/giohang">GIỎ HÀNG</a></li> : null }
                    </ul>
                </nav>
                <aside>
                    <div class="danhmuc">
                        <h3 class="product">DANH MỤC SẢN PHẨM</h3>
                        <img src="image/logotop.png" />
                        <div align="justify">
                            <ul style={{ listStyleType: "none" }}>
                                <li><a href="http://localhost:3000/vanhoc">Văn Học</a></li>
                                <li><a href="http://localhost:3000/kinhte">Kinh Tế</a></li>
                                <li><a href="http://localhost:3000/tamly">Tâm Lý-Kỹ Năng Sống</a></li>
                                <li><a href="http://localhost:3000/nuoiday">Nuôi Dạy Con</a></li>
                                <li><a href="http://localhost:3000/sachthieunhi">Sách Thiếu Nhi</a></li>
                                <li><a href="http://localhost:3000/tieusu">Tiểu Sử-Hồi Kí</a></li>
                                <li><a href="http://localhost:3000/sachngoaingu">Sách ngoại ngữ</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="menu2" align="center">
                        <h3 class="online">HỖ TRỢ TRỰC TUYẾN</h3>
                        <img src="image/logotop.png" />
                        <p> Tư vấn 1</p>
                        <a href="https://www.facebook.com/letrong.tri.1" target="_blank"><img src="image/20176671.jpg" width="110px"
                            height="150px" /></a>
                        <p> Điện Thoại : 0334950677</p>
                    </div>
                    <div class="menu2" align="center">
                        <h3 className="online">ĐỊA CHỈ SHOP</h3>
                        <img src="image/logotop.png" />

                        <iframe
                            src="https://maps.google.com/maps?q=ch%C3%B9a%20l%C3%A1ng&t=&z=13&ie=UTF8&iwloc=&output=embed"
                            width="260" height="260" frameborder="0" style={{ border: "0" }} allowfullscreen></iframe>
                        <img src="image/log.png" width="260px" />
                    </div>
                </aside>
                <article>
                    <br />
                    <h4 class="card-title mt-3 text-center">Đăng Ký</h4>
                    <form id="register" onSubmit={this.handleSubmit}>
                        <div class="form-group input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"> <i class="fa fa-user"></i> </span>
                            </div>
                            <input value={this.state.fullName} onChange={this.handleFullName} name="" class="form-control" placeholder="Nhập tên đầy đủ" type="text" id="inputFullName"></input>
                        </div>
                        <small id="fullNameHelp" className="form-text text-muted"></small>
                        <div class="form-group input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"> <i class="fa fa-envelope"></i> </span>
                            </div>
                            <input value={this.state.email} onChange={this.handleEmail} name="" class="form-control" placeholder="Nhập địa chỉ email" type="email" id="inputEmail"></input>
                        </div>
                        <small id="emailHelp" className="form-text text-muted"></small>
                        <div class="form-group">
                            <label for="exampleFormControlSelect1">Chức vụ</label>
                            <select value={this.state.role} onChange={this.handleOption} class="form-control" id="exampleFormControlSelect1">
                                <option value="Người Mua">Người Mua</option>
                                <option value="Người Bán">Người Bán</option>
                            </select>
                        </div>
                        <div class="form-group input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
                            </div>
                            <input value={this.state.passWord} onChange={this.handlePassword} class="form-control" placeholder="Nhập Password" type="password" id="inputPassword"></input>
                        </div>
                        <small id="passHelp" className="form-text text-muted"></small>
                        <div class="form-group input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
                            </div>
                            <input value={this.state.repeatPass} onChange={this.handleRepeat} class="form-control" placeholder="Nhập lại Password" type="password" id="inputRepeatPassword"></input>
                        </div>
                        <small id="passRepeatHelp" className="form-text text-muted"></small>
                        <div class="form-group">
                            <button type="submit" class="btn btn-primary btn-block"> Tạo Tài Khoản  </button>
                        </div>
                        <small id="resultHelp" className="form-text text-muted"></small>
                        <p class="text-center">Đã có tài khoản? <a href="http://localhost:3000/dangnhap">Đăng Nhập</a> </p>
                    </form>
                </article>
                <footer align="center">
                    <br />
                    <marquee class="chuchay1">Thiên nhiên và sách thuộc về những đôi mắt đã thấy chúng</marquee>
                    <div class="ketthuc"><a href="index.html">Nhà Sách InfoRe Technology</a></div>
                    <br />
                    <b>Địa chỉ: Số 3 Chùa Láng, Hà Nội</b>
                    <br />
                    <br />
                    <p>Hotline của nhà sách: 033 4950677 ~ 033 456789</p>
                </footer>
            </div>
        )
    }
}

export default DangKy;