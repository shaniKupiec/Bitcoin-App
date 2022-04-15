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

  loadContacts = async() => {
    const contacts = await contactService.getContacts()
    this.setState({ contacts })
  }

  render() {
    const { contacts } = this.state
    return contacts ? (
      <section>
        ContactList
        <ContactList contacts={contacts} changeCurrContact={this.props.changeCurrContact}/>
      </section>
    ) : (
      <div>Loading...</div>
    )
  }
}
