import { Component } from 'react'

import { AppHeader } from '../components/AppHeader'
import { HomePage } from './HomePage'
import { ContactPage } from './ContactPage'
import { ContactDetailsPage } from './ContactDetailsPage'
import { StatisticPage } from './StatisticPage'

export default class BitcoinApp extends Component {
  state = {
    currPage: 'home',
    currContactId: null,
  }

  changePage = (currPage) => {
    this.setState({ currPage })
  }

  changeCurrContact = (currContactId) => {
    this.setState({ currContactId }, this.changePage('details'))
  }

  CurrPage = () => {
    switch (this.state.currPage) {
      case 'home':
        return <HomePage />
      case 'contact':
        return <ContactPage changeCurrContact={this.changeCurrContact} />
      case 'details':
        return <ContactDetailsPage contactId={this.state.currContactId} />
      case 'static':
        return <StatisticPage />
      default:
        return <HomePage />
    }
  }

  render() {
    const { CurrPage } = this
    return (
      <>
        <AppHeader changePage={this.changePage} />
        <CurrPage />
      </>
    )
  }
}
