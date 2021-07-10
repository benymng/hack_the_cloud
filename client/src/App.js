import { Route, Switch } from "react-router";

import Home from "./routes/Home";
import Search from "./routes/Search";

const App = () => {
  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/search" component={Search} />
    </Switch>
  );
};

export default App;
