import React, {Component} from 'react';
import './App.css';
import MainPage from './components/MainPage/MainPage';
import { Route } from 'react-router-dom';
import OneTodo from './components/OneTodo/OneTodo';

class App extends Component {
  render() {    
  return (
    <div className="App">
      <div><Route path='/' render={() => <MainPage /> } /></div>
      <div><Route path='/todo/:id' render={() => <OneTodo /> } /> </div>      
    </div>
  );
  }
}

export default App;
