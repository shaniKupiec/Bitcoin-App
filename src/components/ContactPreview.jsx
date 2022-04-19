import React from 'react'
import { Link } from 'react-router-dom'

export function ContactPreview({ contact }) {
  return (
    <Link to={`/contact/${contact._id}`} className="contact">
      {/* <img src={`https://res.cloudinary.com/trellox/image/upload/v1650375562/images_gn0jmg.jpg`} alt="" className="contact__img" /> */}
      <img src={`https://robohash.org/set_set5/${contact._id}.png`} alt="" className="contact__img" />
      <div className="contact__name">
        <span>{contact.name}</span>
        <span className='phone'>{contact.phone}</span>
      </div>
    </Link>
  )
}
