import React from 'react';
import './Main.css';
import './GioiThieu.css';
class GioiThieu extends React.Component {
    componentDidMount() {
        var slides = document.querySelectorAll('#slider .slide');
        var count = slides.length;
        var tam = 0;
        var timenext = setInterval(nextSlide, 2000);

        function nextSlide() {
            slides[tam].className = 'slide';
            if (tam == count - 1) {
                tam = -1;
            }
            tam = tam + 1;
            slides[tam].className = 'slide showing';
        }
    }
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
                    <div id="content">
                        <ul id="slider">
                            <li class="slide showing"><img src="https://znews-photo.zadn.vn/w660/Uploaded/aohunkx/2018_06_13/nha_sach_fahasa.JPG" width="620px" height="240px" /></li>
                            <li class="slide"><img src="https://i.ytimg.com/vi/SW5YTv_8D_U/maxresdefault.jpg" width="620px" height="240px" /></li>
                            <li class="slide"><img src="http://image.sggp.org.vn/w560/Uploaded/2019/nkdkswkqoc/original/2016/08/images654883_7.jpg" width="620px" height="240px" /></li>
                        </ul>
                    </div>
                    <br />
                    <h4 >Giới Thiệu </h4>
                    <br />
                    <br />
                    <div align="justify">
                        <div style={{ marginLeft: '20px' }}> <a href="http://localhost:3000" class="hd1">Nhà Sách Infore Technology</a> gửi tới
                            Quý khách hàng lời chúc sức khỏe và lời chào trân trọng nhất. Chúng tôi xin chân thành cảm ơn Quý
					khách hàng đã tin tưởng sử dụng các sản phẩm của chúng tôi trong thời gian vừa qua.</div>
                        <br />
                        <br />
                        <div style={{ marginLeft: '20px' }}> <a class="hd5">Chúng tôi chuyên phân phối buôn và lẻ các loại sách
						đủ mọi loại giá cả từ <a class="hd2">trong nước cho tới ngoài nước </a>như: <a
                                class="hd3">văn học, kinh tế, tâm lý- kĩ năng sống, nuôi dạy con, sách thiếu nhi đến sách giáo khoa, tham khảo.v.v.</a></a></div>
                        <br />
                        <br />
                        <div style={{ marginLeft: '20px' }}> <a class="hd4">Các Sản phẩm chúng tôi đang phân phối trên thị trường
						hiện nay luôn đáp ứng các tiêu chí sau:</a><br /></div>
                    </div>
                    <div style={{ marginLeft: '20px' }}> - Giá cả luôn rẻ nhất thị trường.<br /><br />
                        - Sản phẩm luôn đảm bảo chất lượng chính hãng;<br /><br />
                        - Thông tin sản phẩm rõ ràng, minh bạch, tư vấn cụ thể từng loại hàng;<br /><br />
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

export default GioiThieu;