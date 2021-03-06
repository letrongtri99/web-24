import React from 'react'
import './Main.css'
import './GioiThieu.css'
class SanPhamChiTiet extends React.Component {
    state = {
        data: {},
        price: 0,
        fullName: '',
        role: '',
        email: '',
        amount:0
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
                })
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
    handlePrice = (event) => {
        const num = Number(event.target.value);
        const price = this.formatMoney(this.state.data.deductprice * num);
        this.setState({
            price: price,
            amount:event.target.value
        })
    }
    componentDidMount() {
        const url = window.location.pathname;
        const id = url.substring(url.lastIndexOf('/') + 1);
        fetch(`http://localhost:3001/products/findDetail/${id}`, {
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

        const fullName = window.localStorage.getItem('fullName');
        const role = window.localStorage.getItem('role');
        const email = window.localStorage.getItem('email');
        if (fullName && role) {
            this.setState({
                fullName: fullName,
                role: role,
                email: email
            })
        }
        else{
            this.setState({
                fullName: window.sessionStorage.getItem('fullName'),
                role: window.sessionStorage.getItem('role'),
                email: window.sessionStorage.getItem('email')
            })
        }
    }
    handleBuy = (event) => {
        var i = window.confirm('Ban Có Chắc Chắn Muốn Đặt Hàng?');
        if (i) {
            fetch(`http://localhost:3001/buy/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    email: this.state.email,
                    title: this.state.data.title,
                    price: this.state.price,
                    amount: this.state.amount,
                    imageUrl: this.state.data.imageUrl,
                    fullName: this.state.fullName
                })
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    if(data.success){
                        window.alert('Đặt Hàng Thành Công');
                    }
                    else{
                        window.alert('Đặt Hàng Thất Bại');
                    }
                })
        }
    }
    render() {
        console.log(this.state.price);
        return (
            <div id="menu">
                <header>
                    <div className="login">
                        {
                            this.state.fullName ? (<div>
                                <a href="" style={{ marginRight: "2px" }}>Chào Mừng {this.state.fullName}</a>
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
                        {this.state.role ? <li><a href="http://localhost:3000/giohang">GIỎ HÀNG</a></li> : null }
                    </ul>
                </nav>
                <aside>
                    <div class="danhmuc">
                        <h3 class="product">DANH MỤC SẢN PHẨM</h3>
                        <img src="../image/logotop.png" />
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
                        <img src="../image/logotop.png" />
                        <p> Tư vấn 1</p>
                        <a href="https://www.facebook.com/letrong.tri.1" target="_blank"><img src="../image/20176671.jpg" width="110px"
                            height="150px" /></a>
                        <p> Điện Thoại : 0334950677</p>
                    </div>
                    <div class="menu2" align="center">
                        <h3 className="online">ĐỊA CHỈ SHOP</h3>
                        <img src="../image/logotop.png" />

                        <iframe
                            src="https://maps.google.com/maps?q=ch%C3%B9a%20l%C3%A1ng&t=&z=13&ie=UTF8&iwloc=&output=embed"
                            width="260" height="260" frameborder="0" style={{ border: "0" }} allowfullscreen></iframe>
                        <img src="../image/log.png" width="260px" />
                    </div>
                </aside>
                <article>
                    <br />
                    <table>
                        <tr>
                            <th><a><img src={this.state.data.imageUrl} width="280px" height="250px" /></a></th>
                            <td align="justify" >
                                <a href="" >{this.state.data.title}</a><br />
                                <p id="p"><del>{this.state.data.price}</del></p>
                                <h4>{this.state.data.deductprice}</h4>
                                <div id="ban">
                                    <div>
                                        Số Lượng: <input type="text" size="1" value={this.state.amount} onChange={this.handlePrice}></input>
                                    </div>
                                </div>
                                Đơn Giá:<h4>{this.state.price}</h4>
                                <button type="button" onClick={this.handleBuy}>Chọn Mua</button>
                            </td>
                        </tr>
                    </table>
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

export default SanPhamChiTiet;