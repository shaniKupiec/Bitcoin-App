import { Component } from 'react'
import contactService from '../services/contact.service'
import { ContactList } from '../components/ContactList'

export class ContactPage extends Component {
  state = {
    contacts: null,
  }

  componentDidMount() {
    this.loadContacts()
  }

  async loadContacts() {
    const contacts = await contactService.getContacts()
    this.setState({ contacts })
  }

  render() {
    const { contacts } = this.state
    return contacts ? (
      <section>
        ContactList
        <ContactList contacts={contacts}/>
      </section>
    ) : (
      <div>Loading...</div>
    )
  }
}
