import React, { Component } from 'react';
import './App.min.css';
import Header from './components/Header';
import AddPlayers from './components/AddPlayers';
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
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/add-players" component={AddPlayers} />
        </Switch>
      </div>
    );
  }
}

export default App;
