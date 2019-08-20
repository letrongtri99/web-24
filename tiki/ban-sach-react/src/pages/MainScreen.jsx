import React from 'react';
import './Main.css'
class MainScreen extends React.Component {
    state = {
        imageLink: 'https://cdn0.fahasa.com/media/magentothem/banner7/sn-tuan-2-915x423-e3.jpg',
    }
    handleMouseOver = (event) => {
        this.setState({
            imageLink: 'https://cdn0.fahasa.com/media/magentothem/banner7/Banner-Tong-NCC_915x423-e.png'
        })
    }
    handleMouseOut = (event) => {
        this.setState({
            imageLink: 'https://cdn0.fahasa.com/media/magentothem/banner7/sn-tuan-2-915x423-e3.jpg'
        })
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
                    <div className="slide">
                        <a href="#" onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
                            <img src={this.state.imageLink} width="700px" height="405px" />
                        </a>
                    </div>

                    <h4 className="flash" >Flash sale</h4>
                    <div class="box">
                        <a class="a" href="#"><img src="https://cdn0.fahasa.com/media/catalog/product/cache/1/small_image/270x364/9df78eab33525d08d6e5fb8d27136e95/n/x/nxbtrestoryfull_07452014_034527.jpg" width="220px"
                            height="200px" /></a><br />
                        <div align="center">
                            <a href="#">CÔ GÁI MÙ CHỮ PHÁ BOM NGUYÊN TỬ</a>
                        </div>
                        <p><del>172.000 VNĐ</del></p>
                        <h4>127.800 VNĐ</h4>
                        <div align="center">
                            <input class="button" type="button" onclick="myClick()" value="Mua hàng" />
                        </div>
                    </div>
                    <div class="box">
                        <a class="a" href="#"><img src="https://cdn0.fahasa.com/media/catalog/product/cache/1/small_image/270x364/9df78eab33525d08d6e5fb8d27136e95/b/_/b_a-truoc-chi_n-tranh-ti_n-t_-tai-ban.jpg" width="220px"
                            height="200px" /></a><br />
                        <div align="center">
                            <a href="#">CHIẾN TRANH TIỀN TỆ- AI MỚI LÀ NGƯỜI THỰC SỰ GIÀU</a>
                        </div>
                        <p><del>145.000 VNĐ</del></p>
                        <h4>98.600 VNĐ</h4>
                        <div align="center">
                            <input class="button" type="button" onclick="myClick()" value="Mua hàng" />
                        </div>
                    </div>
                    <div class="box">
                        <a class="a" href="#"><img src="https://cdn0.fahasa.com/media/catalog/product/cache/1/small_image/270x364/9df78eab33525d08d6e5fb8d27136e95/c/a/cam-nhan-the-nao-doi-trao-the-do.jpg" width="220px"
                            height="200px" /></a><br />
                        <div align="center">
                            <a href="#">CẢM NHẬN THẾ NÀO ĐỜI TRAO THẾ ĐÓ</a>
                        </div>
                        <p><del>68.000 VNĐ</del></p>
                        <h4>38.600 VNĐ</h4>
                        <div align="center">
                            <input class="button" type="button" onclick="myClick()" value="Mua hàng" />
                        </div>
                    </div>

                    <br />
                    <br />

                    <h4 >Nổi Bật </h4>
                    <div class="box">
                        <a class="a" href="#"><img src="https://cdn0.fahasa.com/media/catalog/product/cache/1/small_image/270x364/9df78eab33525d08d6e5fb8d27136e95/u/n/untitled-7_2_8.jpg" width="220px"
                            height="200px" /></a><br />
                        <div align="center">
                            <a href="#">KHI BẠN ĐANG MƠ THÌ NGƯỜI KHÁC NỖ LỰC</a>
                        </div>
                        <p><del>115.000 VNĐ</del></p>
                        <h4>74.750 VNĐ</h4>
                        <div align="center">
                            <input class="button" type="button" onclick="myClick()" value="Mua hàng" />
                        </div>
                    </div>
                    <div class="box">
                        <a class="a" href="#"><img src="https://cdn0.fahasa.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/image_183638.jpg" width="220px"
                            height="200px" /></a><br />
                        <div align="center">
                            <a href="#">CÁC CUỘC CHIẾN TRANH TIỀN TỆ</a>
                        </div>
                        <p><del>138.000 VNĐ</del></p>
                        <h4>85.000 VNĐ</h4>
                        <div align="center">
                            <input class="button" type="button" onclick="myClick()" value="Mua hàng" />
                        </div>
                    </div>
                    <div class="box">
                        <a class="a" href="#"><img src="https://cdn0.fahasa.com/media/catalog/product/cache/1/small_image/270x364/9df78eab33525d08d6e5fb8d27136e95/b/i/bia_26_8.jpg" width="220px"
                            height="200px" /></a><br />
                        <div align="center">
                            <a href="#">KHÉO ĂN NÓI SẼ CÓ ĐƯỢC THIÊN HẠ-BẢN MỚI</a>
                        </div>
                        <p><del>110.000 VNĐ</del></p>
                        <h4>71.000 VNĐ</h4>
                        <div align="center">
                            <input class="button" type="button" onclick="myClick()" value="Mua hàng" />
                        </div>
                    </div>
                    <h4 >Thiếu Nhi </h4>
                    <div class="box">
                        <a class="a" href="#"><img src="https://cdn0.fahasa.com/media/catalog/product/cache/1/small_image/270x364/9df78eab33525d08d6e5fb8d27136e95/i/m/image_195436.jpg" width="220px"
                            height="200px" /></a><br />
                        <div align="center">
                            <a href="#">NHỮNG CÂU TRUYỆN TRIẾT LÍ ĐẶC SẮC</a>
                        </div>
                        <p><del>115.000 VNĐ</del></p>
                        <h4>74.750 VNĐ</h4>
                        <div align="center">
                            <input class="button" type="button" onclick="myClick()" value="Mua hàng" />
                        </div>
                    </div>
                    <div class="box">
                        <a class="a" href="#"><img src="https://cdn0.fahasa.com/media/catalog/product/cache/1/small_image/270x364/9df78eab33525d08d6e5fb8d27136e95/i/m/image_195435.jpg" width="220px"
                            height="200px" /></a><br />
                        <div align="center">
                            <a href="#">CÂU CHUYỆN NHỎ-Ý NGHĨA LỚN</a>
                        </div>
                        <p><del>138.000 VNĐ</del></p>
                        <h4>85.000 VNĐ</h4>
                        <div align="center">
                            <input class="button" type="button" onclick="myClick()" value="Mua hàng" />
                        </div>
                    </div>
                    <div class="box">
                        <a class="a" href="#"><img src="https://cdn0.fahasa.com/media/catalog/product/cache/1/small_image/270x364/9df78eab33525d08d6e5fb8d27136e95/u/n/untitled-2_40.jpg" width="220px"
                            height="200px" /></a><br />
                        <div align="center">
                            <a href="#">NGÀY XỬA NGÀY XƯA- CÔ BÉ LỌ LEM</a>
                        </div>
                        <p><del>110.000 VNĐ</del></p>
                        <h4>71.000 VNĐ</h4>
                        <div align="center">
                            <input class="button" type="button" onclick="myClick()" value="Mua hàng" />
                        </div>
                    </div>
                    <h4 >Tâm Lý- Kỹ Năng </h4>
                    <div class="box">
                        <a class="a" href="#"><img src="https://cdn0.fahasa.com/media/catalog/product/cache/1/small_image/270x364/9df78eab33525d08d6e5fb8d27136e95/_/t/_t-ph_-t_-duy-phi-th_ng-s_ng-t_o.jpg" width="220px"
                            height="200px" /></a><br />
                        <div align="center">
                            <a href="#">ĐỘT PHÁ TƯ DUY PHI THƯỜNG SÁNG TẠO</a>
                        </div>
                        <p><del>115.000 VNĐ</del></p>
                        <h4>74.750 VNĐ</h4>
                        <div align="center">
                            <input class="button" type="button" onclick="myClick()" value="Mua hàng" />
                        </div>
                    </div>
                    <div class="box">
                        <a class="a" href="#"><img src="https://cdn0.fahasa.com/media/catalog/product/cache/1/small_image/270x364/9df78eab33525d08d6e5fb8d27136e95/i/m/image_191177.jpg" width="220px"
                            height="200px" /></a><br />
                        <div align="center">
                            <a href="#">TÔI ĐÃ ĐI DU HỌC BẰNG HỌC BỔNG NHƯ THẾ NÀO?</a>
                        </div>
                        <p><del>138.000 VNĐ</del></p>
                        <h4>85.000 VNĐ</h4>
                        <div align="center">
                            <input class="button" type="button" onclick="myClick()" value="Mua hàng" />
                        </div>
                    </div>
                    <div class="box">
                        <a class="a" href="#"><img src="https://cdn0.fahasa.com/media/catalog/product/cache/1/small_image/270x364/9df78eab33525d08d6e5fb8d27136e95/i/m/image_188766.jpg" width="220px"
                            height="200px" /></a><br />
                        <div align="center">
                            <a href="#">HÀNH TRÌNH ĐẾN LÀNG TRƯỞNG THÀNH</a>
                        </div>
                        <p><del>110.000 VNĐ</del></p>
                        <h4>71.000 VNĐ</h4>
                        <div align="center">
                            <input class="button" type="button" onclick="myClick()" value="Mua hàng" />
                        </div>
                    </div>
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

export default MainScreen;