import React from 'react'
import './Main.css';
import './GioiThieu.css';
class DangNhap extends React.Component {
    state = {
        role: 'Người Mua',
        email: '',
        passWord: '',
        fullName: '',
        roles: '',
        check: false
    }
    componentDidMount() {
        const fullName = window.localStorage.getItem('fullName');
        const role = window.localStorage.getItem('role');
        if (fullName && role) {
            this.setState({
                fullName: fullName,
                roles: role
            })
        }
    }
    handleEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    handlePassword = (event) => {
        this.setState({
            passWord: event.target.value
        })
    }
    handleOption = (event) => {
        this.setState({
            role: event.target.value
        })
    }
    handleChecked = (event) => {
        this.setState({
            check: event.target.checked
        })
    }
    handleSubmitLogin = (event) => {
        event.preventDefault();
        if (this.state.role === 'Người Mua') {
            fetch(`http://localhost:3001/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    email: this.state.email,
                    passWord: this.state.passWord,
                    role: this.state.role
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
                        if (this.state.check) {
                            window.localStorage.setItem('fullName', data.data.fullName);
                            window.localStorage.setItem('role', data.data.role);
                            window.localStorage.setItem('email', data.data.email);
                        }
                        else {
                            window.sessionStorage.setItem('fullName', data.data.fullName);
                            window.sessionStorage.setItem('role', data.data.role);
                            window.sessionStorage.setItem('email', data.data.email);
                        }
                        // window.sessionStorage.setItem('name',data.data.fullName);
                        window.location.assign("http://localhost:3000");
                    }
                });
        }
        else {
            fetch(`http://localhost:3001/admin/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    email: this.state.email,
                    passWord: this.state.passWord,
                    role: this.state.role
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
                        console.log(data)
                        document.getElementById("warning").innerText = " ";
                        //save current to localStorage
                        if (this.state.check) {
                            window.localStorage.setItem('fullName', data.data.fullName);
                            window.localStorage.setItem('role', data.data.role);
                            window.localStorage.setItem('email', data.data.email);
                        }
                        else {
                            window.sessionStorage.setItem('fullName', data.data.fullName);
                            window.sessionStorage.setItem('role', data.data.role);
                            window.sessionStorage.setItem('email', data.data.email);
                        }
                        window.location.assign("http://localhost:3000");
                    }
                });
        }
    }
    render() {
        return (
            <div id="menu">
                <header>
                    <div className="login">
                        <a href="http://localhost:3000/dangky">Đăng Kí</a>
                        <a href="http://localhost:3000/dangnhap">Đăng Nhập</a>
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
                        <li><a href="http://localhost:3000/lienhe">LIÊN HỆ</a></li>
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
                    <h4 class="card-title mt-3 text-center">Đăng Nhập</h4>
                    <form id="login" onSubmit={this.handleSubmitLogin} >
                        <div className="form-group">
                            <label for="exampleInputEmail1">Email</label>
                            <input type="email" value={this.state.email} onChange={this.handleEmail} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Nhập email"></input>
                            <small id="emailHelp" className="form-text text-muted"></small>
                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" value={this.state.passWord} onChange={this.handlePassword} className="form-control" id="exampleInputPassword1" placeholder="Password"></input>
                            <small id="passHelp" className="form-text text-muted"></small>
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlSelect1">Chức vụ</label>
                            <select value={this.state.role} onChange={this.handleOption} class="form-control" id="exampleFormControlSelect1">
                                <option value="Người Mua">Người Mua</option>
                                <option value="Người Bán">Người Bán</option>
                            </select>
                        </div>
                        <div className="form-group form-check">
                            <input type="checkbox" checked={this.state.check} onChange={this.handleChecked} className="form-check-input" id="exampleCheck1"></input>
                            <label className="form-check-label" for="exampleCheck1">Duy Trì Đăng Nhập</label>
                        </div>
                        <button type="submit" class="btn btn-primary" >Đăng Nhập</button>
                        <small id="warning" className="form-text text-muted"></small>
                        <div className="mt-4">
                            <div className="d-flex justify-content-center links">
                                Không có tài khoản? <a href="http://localhost:3000/dangky" className="ml-2">Đăng Ký</a>
                            </div>
                        </div>
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

export default DangNhap;