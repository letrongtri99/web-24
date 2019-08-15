import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import UserScreen from './pages/UserScreen';
import CreatePost from './pages/CreatePost';
import UploadFile from './pages/UploadProfile';

function App() {
  return (
    <BrowserRouter>
        <Route path='/login' exact={true} component={LoginScreen} ></Route>
        <Route path='/register' component={RegisterScreen}></Route>
        <Route path='/profile' component={UserScreen}></Route>
        <Route path='/create-post' component={CreatePost}></Route>
        <Route path='/uploadprofile' component={UploadFile}></Route>
    </BrowserRouter>
  );
}

export default App;
