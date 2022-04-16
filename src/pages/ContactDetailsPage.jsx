import { Component } from 'react'
import contactService from '../services/contact.service'

export class ContactDetailsPage extends Component {
  state = {
    contact: null,
  }

  componentDidMount() {
    this.loadContact()
  }

  loadContact = async () => {
    const contact = await contactService.getContactById(this.props.contactId)
    this.setState({ contact })
  }

  render() {
    const { contact } = this.state
    return contact ? (
      <section className='details-cmp'>
        <div className="details-cmp__btns">
          <i class="fa-solid fa-circle-arrow-left" title="Back"></i>
          <i class="fa-solid fa-pen-to-square" title="Edit"></i>
          {/* <i class="fa-solid fa-trash" title="Remove"></i> */}
        </div>
        <section className="contact-det">
          <img src={`https://robohash.org/set_set5/${contact._id}.png`} alt="" className="contact-det__img" />
          <section className="details">
            <div className="details__name">
              <i class="fa-solid fa-id-card details__icon"></i>
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
