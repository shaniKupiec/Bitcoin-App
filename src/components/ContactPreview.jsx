import React from 'react'
import { Link } from 'react-router-dom'

export function ContactPreview({ contact }) {
  return (
    <Link to={`/contact/${contact._id}`} className="contact-page">
      <img src={`https://robohash.org/set_set5/${contact._id}.png`} alt="" className="contact-page__img" />
      <div className="contact-page__info">
        <span>{contact.name}</span>
        <span className='phone'>{contact.phone}</span>
      </div>
    </Link>
  )
}
