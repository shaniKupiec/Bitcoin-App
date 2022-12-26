import { Component } from 'react'
import { connect } from 'react-redux'

import Lottie from 'react-lottie'
import animationData from '../assets/animations/bitcoin.json'

import { MoveList } from '../components/MoveList'

import bitcoinService from '../services/bitcoin.service'

export class _HomePage extends Component {
  state = {
    user: null,
    rate: null,
  }

  componentDidMount() {
    this.loadUser()
    this.loadRate()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.loggedInUser !== this.props.loggedInUser) {
      this.loadUser()
    }
  }

  loadUser = async () => {
    const user = this.props.loggedInUser
    this.setState({ user })
    console.log('homePage user',user)
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

  get defaultOptions() {
    return {
      loop: true,
      autoplay: true,
      animationData,
    }
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
        {/* <img src="https://res.cloudinary.com/trellox/image/upload/v1650117242/82dbffed0f6d5ed95493e569ce8a35df-removebg-preview_sfcevu.png" alt="" /> */}
        <MoveList movesList={user.moves} title="My Moves" />
        <Lottie options={this.defaultOptions} height={600} width={750} />
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.userModule.loggedInUser
  }
}

const mapDispatchToProps = {
}

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(_HomePage)
