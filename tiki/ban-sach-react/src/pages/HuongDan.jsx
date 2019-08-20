import React from 'react'
import './Main.css';
import './GioiThieu.css';
class HuongDan extends React.Component {
    render() {
        return (
            <div id="menu">
                <header>
                    <div className="login">
                        <a >Đăng Kí</a>
                        <a >Đăng Nhập</a>
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
                    <a class="hd6">Các hình thức đặt hàng:</a> <br /><br />
                    <div align="justify">
                        <div style={{ marginLeft: '20px' }}> 1. Đặt hàng online qua giỏ hàng của website Nhân viên giao hàng sẽ check
					lại đơn hàng và chuyển hàng theo yêu cầu của quý khách hàng.<br /><br /></div>
                        <div style={{ marginLeft: '20px' }}> 2. Call Hotline 24/24h: Quý khách gọi điện (kể cả trong và ngoài giờ
                            hành chính, ngày lễ, chủ nhật....) đến số 0868 017117 ~ 0904 245355 để được tư vấn về sản phẩm, giá
					cả và đặt hàng<br /><br /></div>
                        <div style={{ marginLeft: '20px' }}> 3. Đặt hàng qua facebook: <a
                            href="https://www.facebook.com/letrong.tri.1">https://www.facebook.com/letrong.tri.1</a>
                            Quý khách có thể để lại thông tin qua tin nhắn, nhân viên kinh doanh, kho hoặc nv giao hàng sẽ liên
					lạc lại với quý khách để chốt đơn hàng và giao hàng theo yêu cầu.<br /><br /></div>
                    </div>


                    <a class="hd6">Thủ tục giao hàng</a> <br /><br />
                    <div align="justify">
                        <div style={{ marginLeft: '20px' }}> 1. Đối với khách hàng trong khu vực nội thành Hà Nội: Chúng tôi sẽ
                            chuyển hàng miễn phí theo yêu cầu đặt hàng, quý khách chỉ phải trả tiền khi đã nhận được
					hàng.<br /><br /></div>
                        <div style={{ marginLeft: '20px' }}> 2. Đối với khách hàng các tình ngoại thành và các tỉnh, thành phố trong
					cả nước, chúng tôi áp dụng hình thức chuyển hàng như sau:<br /><br /></div>
                        <div style={{ marginLeft: '20px' }}> * Vận chuyển COD theo đường bưu điện: (thanh toán tiền sau khi nhân viên
                            bưu điện giao hàng)
                            Chúng tôi chuyển hàng theo yêu cầu đơn hàng đến bất cứ địa chỉ nào của khách hàng, nhân viên bưu
                            điện sẽ chuyển hàng đến tận nơi quý khách yêu cầu và thu hộ giá trị đơn hàng khi quý khách nhận được
                            hàng.(Quí khách hàng không cần đến bưu điện nhận hàng)
					<br /><br /></div>
                        <div style={{ marginLeft: '20px' }}>- Chi phí vận chuyển nhà sách thanh toán <br /><br />
                        </div>
                    </div>
                    <div align="center" class="lh">
                        <a class="lh1">Xin liên hệ ngay với</a> <a class="lh2">Nhà Sách InfoRe Technology</a> <a class="lh1"> để
					biết thêm thông tin về giá cả sản phẩm:</a><br />
                        <a class="lh3">Điện thoại:</a><a class="lh1"> 033 4950677 ~ 023 4567890;</a><br />
                        <a class="lh3">Facebook:</a><a class="lh1"> Lê Trọng Trí</a>
                    </div><br />
                    <ul style={{ listStyle: 'circle' }}>
                        <li> Quý khách nhận hàng mới thanh toán tiền; </li>
                        <li> Giao hàng trực tiếp với Khách hàng tại Hà Nội;</li>
                        <li> Khách hàng ở tỉnh khác chúng tôi sẽ chuyển phát nhanh theo đường bưu điện;</li>
                        <li>Miễn phí toàn bộ cước vận chuyển đối với khách hàng mua lẻ trên toàn quốc.</li>
                    </ul>
                    <h2>***Trân trọng cảm ơn sự quan tâm của quý khách hàng***</h2>
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

export default HuongDan;