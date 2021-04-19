import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/HomePage/Home";
import SearchPage from "./pages/SearchPage/SearchPage";
import "./App.css";
import Login from "./Login";

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/search" component={SearchPage} />
          <Route path="/login"><Login /></Route>
          <Route path="/" component={Home} />

        </Switch>
      </div>
    </Router>
  );
}

export default App;
