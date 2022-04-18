import { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min'

import { AppHeader } from '../components/AppHeader'
import { HomePage } from './HomePage'
import { ContactPage } from './ContactPage'
import { ContactDetailsPage } from './ContactDetailsPage'
import { StatisticPage } from './StatisticPage'
import { ContactEditPage } from './ContactEditPage'

export default class BitcoinApp extends Component {

  render() {
    return (
      <Router>
        <AppHeader changePage={this.changePage} />
        <Switch>
          <Route path="/contact/edit/:id?" component={ContactEditPage} />
          <Route path="/contact/:id" component={ContactDetailsPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/chart" component={StatisticPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </Router>
    )
  }
}
