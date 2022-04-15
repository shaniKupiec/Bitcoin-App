import React from 'react'

export function ContactPreview({ contact, changeCurrContact }) {
  return (
    <li className="contact" onClick={() => changeCurrContact(contact._id)}>
      <img src={`https://robohash.org/set_set5/${contact._id}.png`} alt="" className="contact__img" />
      <div className="contact__name">{contact.name}</div>
    </li>
  )
}
