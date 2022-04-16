import { Component } from 'react'
import contactService from '../services/contact.service'

export class ContactEditPage extends Component {
  state = {
    contact: null,
  }

  componentDidMount() {
    this.loadContact()
  }

  loadContact = async () => {
    var contact
    if (this.props.contactId) contact = await contactService.getContactById(this.props.contactId)
    else {
      contact = {
        name: '',
        email: '',
        phone: '',
      }
    }
    this.setState({ contact })
  }

  hangleChange = ({ target }) => {
      const field = target.name
      const value = target.type === 'number' ? +target.value || '' : target.value
      this.setState({ contact[field]: value }, () => {
          this.props.onChangeFilter(this.state)
      })
    }

  render() {
    const { contact } = this.state
    return contact ? (
      <section className="edit-cmp">
        <div className="edit-cmp__btns">
          <i className="fa-solid fa-circle-arrow-left" title="Back"></i>
          {/* <i className="fa-solid fa-trash" title="Remove"></i> */}
        </div>
        <section className="contact-det">
          <img src={`https://robohash.org/set_set5/${contact._id}.png`} alt="" className="contact-det__img" />
          <form className="edit">

            <label htmlFor="name"></label>
            <input type="text" id="name" onChange={this.hangleChange} name="name" value={contact.name}/>

            <label htmlFor="email"></label>
            <input type="email" id="email" onChange={this.hangleChange} name="email" value={contact.email}/>

            <label htmlFor="phone"></label>
            <input type="tel" id="phone" onChange={this.hangleChange} name="phone" value={contact.phone}/>

          </form>
        </section>
      </section>
    ) : (
      <div>Loading...</div>
    )
  }
}
