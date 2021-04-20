import React from "react";
import "react-calendar/dist/Calendar.css";
import Main from "./components/chart";
import theme from "./components/theme";
import Create from "./pages/create";
import { ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MiniDrawer from "./layout/layout";
import Bitcoin from "./pages/bitcoin";

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <MiniDrawer children>
            <Switch>
              <Route exact path="/">
                <Main />
              </Route>
              <Route path="/create">
                <Create />
              </Route>
              <Route path="/bitcoin">
                <Bitcoin />
              </Route>
            </Switch>
          </MiniDrawer>
        </Router>
      </ThemeProvider>
    );
  }
}
export default App;
