import { Component } from 'react'

import userService from '../services/user.service'
import bitcoinService from '../services/bitcoin.service'

export class HomePage extends Component {
  state = {
    user: null,
    rate: null,
  }

  componentDidMount() {
    this.loadUser()
    this.loadRate()
  }

  loadUser = async() => {
    const user = userService.getUser()
    this.setState({ user })
  }

  loadRate = async() => {
    const rate = await bitcoinService.getRate(1)
    this.setState({ rate })
  }

  render() {
    const { user, rate } = this.state
    if (!user || !rate) return <div>Loading...</div>
    return (
      <section>
        <div>
          Hello {user.name}
          you have {user.coins} USD available at the moment
        </div>
        <div>
          Current Bitcoin rate:
          <span>1 USD </span>
          <span>{rate} bitcoin</span>
        </div>
      </section>
    )
  }
}
