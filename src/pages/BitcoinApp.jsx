import { useEffect, useState } from "react";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";

import { AppHeader } from "../components/AppHeader";
import { HomePage } from "./HomePage";
import { ContactPage } from "./ContactPage";
import { ContactDetailsPage } from "./ContactDetailsPage";
import { MarketPage } from "./MarketPage";
import { ContactEditPage } from "./ContactEditPage";
import { SignUpPage } from "./SignUpPage";

import { loadLoggedInUser } from "../store/actions/userActions";

export const BitcoinApp = (props) => {
  useEffect(() => {
    dispatch(loadLoggedInUser());
  }, []);

  const { loggedInUser } = useSelector((state) => state.userModule);
  const dispatch = useDispatch();
  const [key, setKey] = useState(0);

  
  useEffect(() => {
    // setKey(prevState => prevState + 1)
    // setLoggedInUser(useSelector((state) => state.userModule).loggedUser)
  }, [loggedInUser]);

  const PrivateRoute = (props) => {
    if(loggedInUser){
      return <Route {...props} />
    }
    return <Redirect to="/signup" />
  };

  return (
    <section className="app">

    <Router>
      <Switch>
        <PrivateRoute path="/contact/edit/:id?" component={ContactEditPage} />
        <PrivateRoute path="/contact/:id" component={ContactDetailsPage} />
        <PrivateRoute path="/contact" component={ContactPage} />
        <PrivateRoute path="/market" component={MarketPage} />
        <Route path="/signup" component={SignUpPage} />
        <PrivateRoute path="/" component={HomePage} className="main"/>
      </Switch>
      <AppHeader />
    </Router>
    </section>
  );
};
