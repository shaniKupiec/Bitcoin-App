import React from 'react'
import { Link } from 'react-router-dom'

export function ContactPreview({ contact }) {
  return (
    <Link to={`/contact/${contact._id}`} className="contact">
      <img src={`https://robohash.org/set_set5/${contact._id}.png`} alt="" className="contact__img" />
      <div className="contact__name">{contact.name}</div>
    </Link>
  )
}
