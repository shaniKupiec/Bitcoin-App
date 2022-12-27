import { useEffect, useState } from "react";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";

import { AppHeader } from "../components/AppHeader";
import { HomePage } from "./HomePage";
import { ContactPage } from "./ContactPage";
import { ContactDetailsPage } from "./ContactDetailsPage";
import { StatisticPage } from "./StatisticPage";
import { ContactEditPage } from "./ContactEditPage";
import { SignUpPage } from "./SignUpPage";

import { loadLoggedInUser } from "../store/actions/userActions";

export const BitcoinApp = (props) => {
  useEffect(() => {
    console.log('loadLoggedInUser');
    dispatch(loadLoggedInUser());
  }, []);

  const { loggedInUser } = useSelector((state) => state.userModule);
  const dispatch = useDispatch();
  const [key, setKey] = useState(0);

  
  useEffect(() => {
    console.log('userModule changed!', loggedInUser);
    setKey(prevState => prevState + 1)
    // setLoggedInUser(useSelector((state) => state.userModule).loggedUser)
  }, [loggedInUser]);

  const PrivateRoute = (props) => {
    if(loggedInUser){
      console.log('loggedInUser true');
      return <Route {...props} />
    }
    console.log('loggedInUser false');
    return <Redirect to="/signup" />
  };

  return (
    <Router>
      {/* <div>{key}</div> */}
      <Switch>
        <PrivateRoute path="/contact/edit/:id?" component={ContactEditPage} />
        <PrivateRoute path="/contact/:id" component={ContactDetailsPage} />
        <PrivateRoute path="/contact" component={ContactPage} />
        <PrivateRoute path="/chart" component={StatisticPage} />
        <Route path="/signup" component={SignUpPage} />
        <PrivateRoute path="/" component={HomePage} />
      </Switch>
      <AppHeader />
    </Router>
  );
};
