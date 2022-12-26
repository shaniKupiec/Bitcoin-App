import { Component } from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import { connect } from 'react-redux'

import { AppHeader } from '../components/AppHeader'
import { HomePage } from './HomePage'
import { ContactPage } from './ContactPage'
import { ContactDetailsPage } from './ContactDetailsPage'
import { StatisticPage } from './StatisticPage'
import { ContactEditPage } from './ContactEditPage'
import { SignupPage } from './SignupPage'

import userService from '../services/user.service'
import { loadLoggedInUser } from '../store/actions/userActions'

export class _BitcoinApp extends Component {
  // PrivateRoute = (props) => {
  //   const isLoggedUser = userService.getLoggedInUser()
  //   return isLoggedUser ? <Route {...props} /> : <Redirect to="/signup" />
  // }

  componentDidMount() {
    console.log('%c _BitcoinApp', "color:red ;font-weight: bold")
    this.props.loadLoggedInUser()
    console.log('after loading logged in user _BitcoinApp');
    // console.log('this.props.loggedInUser', this.props.loggedInUser)
  }

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

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.userModule.loggedInUser
  }
}

const mapDispatchToProps = {
  loadLoggedInUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(_BitcoinApp)
