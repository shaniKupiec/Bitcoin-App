import React from 'react'

export function ContactPreview({ contact }) {
  return (
    <li className="contact">
      <img src={`https://robohash.org/set_set5/${contact._id}.png`} alt="" className="contact__img" />
      <div className="contact__name">{contact.name}</div>
    </li>
  )
}
