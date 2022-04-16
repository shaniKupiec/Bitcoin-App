import { Component } from 'react'

import { ContactFilter } from '../components/ContactFilter'
import { ContactList } from '../components/ContactList'

import contactService from '../services/contact.service'

export class ContactPage extends Component {
  state = {
    contacts: null,
  }

  componentDidMount() {
    this.loadContacts()
  }

  loadContacts = async (filterBy = {}) => {
    const contacts = await contactService.getContacts(filterBy)
    this.setState({ contacts })
  }

  render() {
    const { contacts } = this.state
    return contacts ? (
      <>
        <ContactFilter onChangeFilter={this.loadContacts} />
        <ContactList contacts={contacts} changeCurrContact={this.props.changeCurrContact} />
      </>
    ) : (
      <div>Loading...</div>
    )
  }
}
