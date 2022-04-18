import { Component } from 'react'
import { Link } from 'react-router-dom'
// import { connect } from 'react-redux'
// import { removeContact, saveContact } from '../store/actions/contactActions'

import { TransferFund } from '../components/TransferFund'

import contactService from '../services/contact.service'
import userService from '../services/user.service'

export class ContactDetailsPage extends Component {
  state = {
    contact: null,
    loggedinUser: null,
  }

  componentDidMount() {
    this.loadContact()
    this.loadLoggedinUser()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.loadContact()
      this.loadLoggedinUser()
    }
  }

  loadContact = async () => {
    const contact = await contactService.getById(this.props.match.params.id)
    this.setState({ contact })
  }

  loadLoggedinUser = () => {
    const loggedinUser = userService.getLoggedInUser()
    this.setState({ loggedinUser })
  }

  onBack = () => {
    this.props.history.push('/contact')
  }

  onTransferCoins = (amount) => {
    userService.addMove(this.state.contact, amount)
  }

  render() {
    const { contact, loggedinUser } = this.state
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

        <TransferFund contact={this.state.contact} maxCoins={loggedinUser.coins} onTransferCoins={this.onTransferCoins} />
      </section>
    ) : (
      <div>Loading...</div>
    )
  }
}
