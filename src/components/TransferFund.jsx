import { Component } from "react";

import bitcoinTitle from '../assets/images/bitcoin-title.png'

export class TransferFund extends Component {
  state = {
    amount: 0,
  };

  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.type === "number" ? +target.value || "" : target.value;
    this.setState({ [field]: value });
  };

  onTransferCoins = () => {
    this.props.onTransferCoins(this.state.amount);
  };

  render() {
    const { amount } = this.state;
    var className = amount === 0 ? "disable" : "";
    className += this.props.maxCoins - amount < 0 ? "disable" : "";
    return (
      <section className="trans">
        <div className="trans__input">
          <input type="number" min="0" max={this.props.maxCoins} onChange={this.handleChange} id="amount" name="amount" value={amount} />
          <img src={bitcoinTitle} alt="" />
          <span>Bitcoin</span>
        </div>
        <button onClick={this.onTransferCoins} className={className}>
          Transfer
        </button>
      </section>
    );
  }
}
