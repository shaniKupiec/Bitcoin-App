import { Component } from 'react'
import { Link } from 'react-router-dom'
// import { connect } from 'react-redux'

import contactService from '../services/contact.service'
// import { loadContacts, setFilterBy } from '../store/actions/contactActions'

export class ContactDetailsPage extends Component {
  state = {
    contact: null,
  }

  componentDidMount() {
    this.loadContact()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.loadContact()
    }
  }

  loadContact = async () => {
    const contact = await contactService.getById(this.props.match.params.id)
    this.setState({ contact })
  }

  onBack = () => {
    this.props.history.push('/contact')
  }

  render() {
    const { contact } = this.state
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
      </section>
    ) : (
      <div>Loading...</div>
    )
  }
}

// const mapStateToProps = state => {
//   return {
//     contacts: state.contactModule.contacts
//   }
// }

// const mapDispatchToProps = {
//   loadContact,
// }

// export const RobotApp = connect(mapStateToProps, mapDispatchToProps)(_RobotApp)