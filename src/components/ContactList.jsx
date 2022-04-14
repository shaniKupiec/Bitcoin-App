import React from 'react'
import { ContactPreview } from './ContactPreview'

export function ContactList({ contacts }) {
  return (
    <ul className="contact-list clean-list">
      {contacts.map((contact) => (
        <ContactPreview key={contact._id} contact={contact} />
      ))}
    </ul>
  )
}
