import { Component } from 'react'

export class TransferFund extends Component {
  state = {
    amount: 0,
  }

  hangleChange = ({ target }) => {
    const field = target.name
    const value = target.type === 'number' ? +target.value || '' : target.value
    this.setState({ [field]: value })
  }

  onTransferCoins = () => {
    this.props.onTransferCoins(this.state.amount)
  }

  render() {
    const { amount } = this.state
    console.log('amount',amount)
    const className = amount === 0 ? 'disable' : ''
    console.log('className',className)
    return (
      <section className="trans">
        <div className='trans__title'>Transfer coins to {this.props.contact.name}:</div>
        <div className="trans__form">
          <label htmlFor="amount">Amount:</label>
          <input type="number" min="0" max={this.props.maxCoins} onChange={this.hangleChange} id="amount" name="amount" value={amount} />
          <button onClick={this.onTransferCoins} className={className}>Transfer</button>
        </div>
      </section>
    )
  }
}