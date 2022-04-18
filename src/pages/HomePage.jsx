import { Component } from 'react'

import { MoveList } from '../components/MoveList'

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

  loadUser = async () => {
    const user = userService.getLoggedInUser()
    this.setState({ user })
  }

  loadRate = async () => {
    var rate = await bitcoinService.getRate(1)
    rate = this.formatNum(rate)
    this.setState({ rate })
  }

  formatNum = (rate) => {
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    })
    return formatter.format(Number.parseFloat(1 / +rate).toFixed(2))
  }

  render() {
    const { user, rate } = this.state
    if (!user || !rate) return <div>Loading...</div>
    return (
      <section className="home">
        <div className="home__user">
          <h1>Hello {user.name}</h1>
          <h3>you have {user.coins} USD available at the moment</h3>
        </div>
        <div className="home__bitcoin">
          Current Bitcoin rate:
          <div>
            <span className="home__bitcoin__num">{rate}</span>
            USD
          </div>
        </div>
        <img src="https://res.cloudinary.com/trellox/image/upload/v1650117242/82dbffed0f6d5ed95493e569ce8a35df-removebg-preview_sfcevu.png" alt="" />
        <MoveList movesList={user.moves} title="My Moves" />
      </section>
    )
  }
}
