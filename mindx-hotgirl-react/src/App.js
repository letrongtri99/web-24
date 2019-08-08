import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import UserScreen from './pages/UserScreen'

function App() {
  return (
    <BrowserRouter>
        <Route path='/login' exact={true} component={LoginScreen} ></Route>
        <Route path='/register' component={RegisterScreen}></Route>
        <Route path='/profile' component={UserScreen}></Route>
    </BrowserRouter>
  );
}

export default App;
