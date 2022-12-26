import { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getContactById } from '../store/actions/contactActions'
import { spendBalance } from '../store/actions/userActions'

import { TransferFund } from '../components/TransferFund'
import { MoveList } from '../components/MoveList'

export class _ContactDetailsPage extends Component {
  state = {
    contact: null,
    loggedInUser: null,
  }

  componentDidMount() {
    this.loadContact()
    this.loadLoggedInUser()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.loadContact()
      this.loadLoggedInUser()
    }
  }

  loadContact = async () => {
    const contact = await this.props.getContactById(this.props.match.params.id)
    this.setState({ contact })
  }

  loadLoggedInUser = () => {
    const { loggedInUser } = this.props
    this.setState({ loggedInUser })
  }

  onBack = () => {
    this.props.history.push('/contact')
  }

  onTransferCoins = (amount) => {
    this.props.spendBalance(this.state.contact, amount)
    this.loadContact()
    this.loadLoggedInUser()
  }

  render() {
    const { contact, loggedInUser } = this.state
    if (!loggedInUser || !contact) return <div>Loading...</div>
    return contact ? (
      <section className="details-cmp">
        <div className="details-cmp__btns">
          <i className="fa-solid fa-circle-arrow-left" title="Back" onClick={this.onBack}></i>
          <Link to={`/contact/edit/${contact._id}`}>
            <i className="fa-solid fa-pen-to-square" title="Edit"></i>
          </Link>
        </div>
        <section className="contact-det">
          <img src={`https://robohash.org/set_set5/${contact._id}.png`} alt="" className="contact-det__img" />
          <section className="details">
            <div className="details__name">
              <i className="fa-solid fa-id-card details__icon"></i>
              {contact.name}
            </div>
            <div className="details__email">
              <i className="fa-solid fa-envelope details__icon"></i>
              {contact.email}
            </div>
            <div className="details__phone">
              <i className="fa-solid fa-phone details__icon"></i>
              {contact.phone}
            </div>
          </section>
        </section>

        <TransferFund contact={this.state.contact} maxCoins={loggedInUser.coins} onTransferCoins={this.onTransferCoins} />
        <MoveList movesList={loggedInUser.moves.filter((m) => m.toId === contact._id)} title="My Moves" />
      </section>
    ) : (
      <div>Loading...</div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.userModule.loggedInUser,
  };
};

const mapDispatchToProps = {
  getContactById,
  spendBalance
};

export const ContactDetailsPage = connect(mapStateToProps, mapDispatchToProps)(_ContactDetailsPage);
