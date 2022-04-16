import React from 'react'

export function AppHeader({ changePage }) {
  return (
    <header>
      <i className="fa-solid fa-house-user header__icon" onClick={() => changePage('home')} title="Home"></i>
      <i className="fa-solid fa-address-book header__icon" onClick={() => changePage('contact')} title="Contacts"></i>
      <i className="fa-solid fa-chart-line header__icon" onClick={() => changePage('static')} title="Charts"></i>
    </header>
  )
}
