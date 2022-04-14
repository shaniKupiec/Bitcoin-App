import React from 'react'
import { ContactPreview } from './ContactPreview'

export function ContactList({ contacts }) {
  return (
    <div>
      {contacts.map((contact) => (
        <ContactPreview key={contact._id} contact={contact} />
      ))}
    </div>
  )
}