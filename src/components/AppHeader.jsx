import React from 'react'

export function AppHeader({changePage}) {
  return (
    <header>
      <button onClick={() => changePage('home')}>Home</button>
      <button onClick={() => changePage('contact')}>Contact</button>
    </header>
  )
}
