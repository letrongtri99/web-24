import React from 'react'
import './Main.css';
import './GioiThieu.css';
class GioHangNguoiMua extends React.Component {
    state = {
        data: [],
        fullName: '',
        role: '',
        email: ''
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
                            fullName: '',
                            role: ''
                        },
                    });
                    window.location.assign(`http://localhost:3000`);
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
                            fullName: '',
                            role: ''
                        },
                    });
                    window.location.assign(`http://localhost:3000`);
                })
        }
    }
    componentDidMount() {
        const fullName = window.localStorage.getItem('fullName');
        const role = window.localStorage.getItem('role');
        if (fullName && role) {
            this.setState({
                fullName: fullName,
                role: role,
                email: window.localStorage.getItem('email')
            })
            if (window.localStorage.getItem('role') === 'users') {
                fetch(`http://localhost:3001/buy/findDetail/${window.localStorage.getItem('email')}`, {
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
                        this.setState({
                            data: data.data
                        })
                    })
            }
            else {
                fetch(`http://localhost:3001/buy/findAll`, {
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
                        this.setState({
                            data: data.data
                        })
                    })
            }
        }
        else {
            this.setState({
                fullName: window.sessionStorage.getItem('fullName'),
                role: window.sessionStorage.getItem('role'),
                email: window.sessionStorage.getItem('email')
            })
            if (window.sessionStorage.getItem('role') === 'users') {
                fetch(`http://localhost:3001/buy/findDetail/${window.sessionStorage.getItem('email')}`, {
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
                        console.log(data);
                        this.setState({
                            data: data.data
                        })
                    })
            }
            else {
                fetch(`http://localhost:3001/buy/findAll`, {
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
                        this.setState({
                            data: data.data
                        })
                    })
            }
        }
    }
    formatMoney(amount, decimalCount = 3, decimal = ".", thousands = ".") {
        try {
            decimalCount = Math.abs(decimalCount);
            decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

            const negativeSign = amount < 0 ? "-" : "";

            let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
            let j = (i.length > 3) ? i.length % 3 : 0;

            return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
        } catch (e) {
            console.log(e)
        }
    };
    render() {
        return (
            <div id="menu">
                <header>
                    <div className="login">
                        {
                            this.state.fullName ? (<div id="display">
                                <a href="" style={{ marginRight: "5px" }}>Chào Mừng {this.state.fullName}</a>
                                <a style={{ marginRight: "2px" }}>Vai Trò: {this.state.role}</a>
                                <a href="" style={{ marginRight: "2px" }} onClick={this.handleLogOut}>Đăng Xuất</a>
                                <a href="http://localhost:3000/dangky">Đăng Kí</a>
                            </div>
                            )
                                :
                                (<div><a style={{ marginRight: "5px" }} href="http://localhost:3000/dangky">Đăng Kí</a>
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
                        {this.state.role === 'admin' ? <li><a href="http://localhost:3000/danghang">ĐĂNG HÀNG</a></li> : null}
                        {this.state.role ? <li><a href="http://localhost:3000/giohang">GIỎ HÀNG</a></li> : null}
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
                    {this.state.data.map((item) => {
                        return (
                            <table>
                                <tr>
                                    <th><a><img src={item.imageUrl} width="280px" height="250px" /></a></th>
                                    <td align="justify" >
                                        <h4 >{item.products}</h4><br />
                                        {this.state.role === 'admin' ? <h4 >Người mua: {item.fullName}</h4> : null}
                                        Số Lượng:<h4>{item.amount}</h4>
                                        Đơn Giá:<h4>{this.formatMoney(item.price)}</h4>
                                    </td>
                                </tr>
                            </table>
                        )

                    })}
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

export default GioHangNguoiMua;