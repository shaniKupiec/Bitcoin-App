import { Component } from 'react'

import { AppHeader } from '../components/AppHeader'
import { HomePage } from './HomePage'
import { ContactPage } from './ContactPage'

export default class BitcoinApp extends Component {
  state = {
    currPage: 'contact',
  }

  changePage = (currPage) => {
    console.log('currPage', currPage)
    this.setState({ currPage })
  }

  CurrPage = () => {
    switch (this.state.currPage) {
      case 'contact':
        return <ContactPage />
      case 'home':
        return <HomePage />
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
