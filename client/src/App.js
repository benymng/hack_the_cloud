import { Route, Switch } from "react-router";

import Home from "./routes/Home";
import Search from "./routes/Search";
import Recipe from "./routes/Recipe";

const App = () => {
  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/search" component={Search} />
      <Route path="/recipe" component={Recipe} />
    </Switch>
  );
};

export default App;
