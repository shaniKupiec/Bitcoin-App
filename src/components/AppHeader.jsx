import React from 'react'

export function AppHeader({ changePage }) {
  return (
    <header>
      <i class="fa-solid fa-house-user header__icon" onClick={() => changePage('home')} title="Home"></i>
      <i class="fa-solid fa-address-book header__icon" onClick={() => changePage('contact')} title="Contacts"></i>
      <i class="fa-solid fa-chart-line header__icon" onClick={() => changePage('static')} title="Charts"></i>
    </header>
  )
}
