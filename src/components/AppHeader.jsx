import React from 'react'
import { NavLink } from 'react-router-dom'

export function AppHeader() {
  return (
    <header>
      <NavLink to="/" exact>
        <i className="fa-solid fa-house-user header__icon" title="Home"></i>
      </NavLink>
      <NavLink to="/contact">
        <i className="fa-solid fa-address-book header__icon" title="Contacts"></i>
      </NavLink>
      <NavLink to="/chart">
        <i className="fa-solid fa-chart-line header__icon" title="Charts"></i>
      </NavLink>
    </header>
  )
}
