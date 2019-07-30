import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import CreateGame from './pages/CreateGame';
import PlayScreen from './pages/PlayScreen';

function App() {
  // "/"=> create game
  // "/games/id"=> game detail 
  return (
    <BrowserRouter>
      <Route path='/' exact={true} component={CreateGame} ></Route>
      <Route path='/games/:gameid' component={PlayScreen}></Route>
    </BrowserRouter>
  );
}

export default App;
