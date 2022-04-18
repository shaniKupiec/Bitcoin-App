import { Component } from 'react'
import { Link } from 'react-router-dom'

import { ContactFilter } from '../components/ContactFilter'
import { ContactList } from '../components/ContactList'

import contactService from '../services/contact.service'

export class ContactPage extends Component {
  state = {
    contacts: null,
    filterBy: null,
  }

  componentDidMount() {
    this.loadContacts()
  }

  loadContacts = async () => {
    const contacts = await contactService.getContacts(this.state.filterBy)
    this.setState({ contacts })
  }

  onChangeFilter = (filterBy) => {
    this.setState({ filterBy }, this.loadContacts)
  }

  render() {
    const { contacts } = this.state
    if (!contacts) return <div>Loading...</div>
    // if (!contacts.length) return <div>No contacts found</div>
    return (
      <>
        <ContactFilter onChangeFilter={this.onChangeFilter} />
        <ContactList contacts={contacts} />
        <Link className="add-btn" to="/contact/edit/">
          +
        </Link>
        {/* history={this.props.history} */}
      </>
    )
  }
}
// {
//   !contacts && <div>Loading...</div>
// }
// {
//   !contacts.length && <div>No contacts found</div>
// }
// {
//   contacts.length && (
//     <>
//       <ContactFilter onChangeFilter={this.loadContacts} />
//       <ContactList contacts={contacts}/>
//     </>
//   )
// }
