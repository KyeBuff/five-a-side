import React, { Component } from "react";
import "./App.min.css";
import Header from "./components/Header";
import FourOhFour from "./components/FourOhFour";
import TeamOne from "./containers/TeamOne";
import TeamTwo from "./containers/TeamTwo";
import Players from "./containers/Players";
import Landing from "./components/landing-page/Landing";
import {
    Route,
    Switch,
} from "react-router-dom";

// TODO 
//Save teams at the end

class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/players" component={Players} />
          <Route path="/team-one" component={TeamOne} />
          <Route path="/team-two" component={TeamTwo} />
          <FourOhFour />
        </Switch>
      </div>
    );
  }
}

export default App;
