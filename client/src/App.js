import { Route, Switch } from "react-router";

import Home from "./routes/Home";
import Search from "./routes/Search";
import Recipe from "./routes/Recipe";
import Cook from "./routes/Cook";

const App = () => {
  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/search" component={Search} />
      <Route path="/recipe" component={Recipe} />
      <Route path="/cook" component={Cook} />
    </Switch>
  );
};

export default App;
