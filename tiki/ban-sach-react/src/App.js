import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import MainScreen from './pages/MainScreen';
import './App.css';

function App() {
  return (
    <BrowserRouter>
        <Route path='/' exact={true} component={MainScreen} ></Route>
    </BrowserRouter>
  );
}

export default App;
