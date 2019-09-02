import React from "react";
import Home from "../Home";
import Login from "../Login";
import Orders from "../OrderDetails";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <section>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/orders-details/:email/:id" component={Orders} />
        </Switch>
      </section>
    </div>
  );
}

export default App;
