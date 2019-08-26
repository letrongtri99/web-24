import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import MainScreen from './pages/MainScreen';
import GioiThieu from './pages/GioiThieu';
import TinSachTrongNuoc from './pages/TinSachTrongNuoc';
import HuongDan from './pages/HuongDan';
import LienHe from './pages/LienHe';
import './App.css';
import TinSachNuocNgoai from './pages/TinSachNuocNgoai';
import TinSachChiTiet from './pages/TinSachChiTiet';
import VanHoc from './pages/VanHoc';
import KinhTe from './pages/KinhTe';
import TamLy from './pages/TamLy';
import NuoiCon from './pages/NuoiCon';
import ThieuNhi from './pages/ThieuNhi';
import TieuSu from './pages/TieuSu';
import NgoaiNgu from './pages/NgoaiNgu';
import SanPhamChiTiet from './pages/SanPhamChiTiet';
import DangNhap from './pages/DangNhap';
import DangKy from './pages/DangKy';
import DangHang from './pages/DangHang'
import GioHangNguoiMua from './pages/GioHangNguoiMua'
function App() {
  return (
    <BrowserRouter>
        <Route path='/' exact={true} component={MainScreen} ></Route>
        <Route path='/gioithieu' component={GioiThieu}></Route>
        <Route path='/tinsachtrongnuoc' component={TinSachTrongNuoc}></Route>
        <Route path='/tinsachnuocngoai' component={TinSachNuocNgoai}></Route>
        <Route path='/tinsach/:ten' component={TinSachChiTiet}></Route>
        <Route path='/huongdan' component={HuongDan}></Route>
        <Route path='/lienhe' component={LienHe}></Route>
        <Route path='/vanhoc' component={VanHoc} ></Route>
        <Route path='/kinhte' component={KinhTe}></Route>
        <Route path='/tamly' component={TamLy}></Route>
        <Route path='/nuoiday' component={NuoiCon}></Route>
        <Route path='/sachthieunhi' component={ThieuNhi}></Route>
        <Route path='/tieusu' component={TieuSu} ></Route>
        <Route path='/sachngoaingu' component={NgoaiNgu}></Route>
        <Route path='/sanpham/:id' component={SanPhamChiTiet}></Route>
        <Route path='/dangnhap' component={DangNhap}></Route>
        <Route path='/dangky' component={DangKy}></Route>
        <Route path='/danghang' component={DangHang}></Route>
        <Route path='/giohang' component={GioHangNguoiMua}></Route>
    </BrowserRouter>
  );
}

export default App;
