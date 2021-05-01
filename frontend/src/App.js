import React from "react";
import "react-calendar/dist/Calendar.css";
import Main from "./components/chart";
import theme from "./components/theme";
import Create from "./pages/create";
import { ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MiniDrawer from "./layout/layout";
import Bitcoin from "./pages/bitcoin";
import Login from "./pages/accounts/login";
import Signup from "./pages/accounts/signup";
import Activate from "./pages/accounts/activate";
import ResetPassword from "./pages/accounts/resetpass";
import ResetPasswordConfirm from "./pages/accounts/resetpassconfirm";
import { Provider } from "react-redux";
import store from "./auth/store/store";
import Facebook from "./pages/accounts/facebook";
import Google from "./pages/accounts/google";
class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
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
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/signup">
                  <Signup />
                </Route>
                <Route path="/reset_password">
                  <ResetPassword />
                </Route>
                <Route
                  path="/password/reset/confirm/:uid/:token"
                  component={ResetPasswordConfirm}
                />

                <Route path="/activate/:uid/:token" component={Activate} />
                <Route path="/google" component={Google} />
                <Route path="/facebook" component={Facebook} />
              </Switch>
            </MiniDrawer>
          </Router>
        </ThemeProvider>
      </Provider>
    );
  }
}
export default App;
