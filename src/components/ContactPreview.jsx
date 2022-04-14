import React from 'react'

export function ContactPreview({ contact }) {
  return (
    <>
      <img src={`https://robohash.org/set_set5/${contact._id}.png`} alt="img" />
      <div>{contact.name}</div>
    </>
  )
}
