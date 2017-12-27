import React, { Component } from 'react';
import './App.min.css';
import Header from './components/Header';
import Landing from './components/landing-page/Landing';
import {
    Route,
    Switch,
} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Landing />
      </div>
    );
  }
}

export default App;
