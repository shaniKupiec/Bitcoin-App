import { Component } from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom/cjs/react-router-dom.min'

import { AppHeader } from '../components/AppHeader'
import { HomePage } from './HomePage'
import { ContactPage } from './ContactPage'
import { ContactDetailsPage } from './ContactDetailsPage'
import { StatisticPage } from './StatisticPage'
import { ContactEditPage } from './ContactEditPage'
import { SignupPage } from './SignupPage'

import userService from '../services/user.service'

export default class BitcoinApp extends Component {
  // PrivateRoute = (props) => {
  //   const isLoggedUser = userService.getLoggedInUser()
  //   return isLoggedUser ? <Route {...props} /> : <Redirect to="/signup" />
  // }

  render() {
    return (
      <Router>
        <AppHeader />
        <Switch>
          <Route path="/contact/edit/:id?" component={ContactEditPage} />
          <Route path="/contact/:id" component={ContactDetailsPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/chart" component={StatisticPage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </Router>
    )
  }
}
