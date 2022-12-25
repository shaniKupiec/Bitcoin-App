import { Component } from 'react'
import { connect } from 'react-redux'

import contactService from '../services/contact.service'
import { removeContact, saveContact } from '../store/actions/contactActions'

export class _ContactEditPage extends Component {
  state = {
    contact: null,
  }

  componentDidMount() {
    this.loadContact()
  }

  componentDidUpdate(prevProps, prevState) {
    // relevant for the NEXT feature 
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.loadContact()
    }
  }

  loadContact = async () => {
    // console.log('this.props.match.params.id',this.props.match.params.id)
    const contact = this.props.match.params.id ? await contactService.getById(this.props.match.params.id) : contactService.getEmpty()
    this.setState({ contact })
  }

  handleChange = async ({ target }) => {
    const field = target.name
    const value = target.type === 'number' ? +target.value || '' : target.value
    this.setState((prevState) => ({ contact: { ...prevState.contact, [field]: value } }))
  }

  onSave = async (ev) => {
    ev.preventDefault()
    this.props.saveContact(this.state.contact)
    this.onBack()
  }

  onRemove = async () => {
    this.props.removeContact(this.state.contact._id)
    this.onBack(false)
  }

  onBack = (toContacts = true) => {
    this.state.contact._id && toContacts ? this.props.history.push(`/contact/${this.state.contact._id}`) : this.props.history.push(`/contact`)
  }

  render() {
    const { contact } = this.state
    return contact ? (
      <section className="edit-cmp">
        <div className="edit-cmp__btns">
          <i className="fa-solid fa-circle-arrow-left" title="Back" onClick={this.onBack}></i>
          {contact._id && <i className="fa-solid fa-trash" title="Remove" onClick={this.onRemove}></i>}
        </div>
        <section className="contact-det">
          <img src={`https://robohash.org/set_set5/${contact._id}.png`} alt="" className="contact-det__img" />
          <form className="edit" onSubmit={this.onSave}>
            <span className="edit__row">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" onChange={this.handleChange} name="name" value={contact.name} />
            </span>

            <span className="edit__row">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" onChange={this.handleChange} name="email" value={contact.email} />
            </span>

            <span className="edit__row">
              <label htmlFor="phone">Phone:</label>
              <input type="tel" id="phone" onChange={this.handleChange} name="phone" value={contact.phone} />
            </span>

            <button className="edit__save">
              Save
            </button>
          </form>
        </section>
      </section>
    ) : (
      <div>Loading...</div>
    )
  }
}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = {
  removeContact,
  saveContact,
}

export const ContactEditPage = connect(mapStateToProps, mapDispatchToProps)(_ContactEditPage)
