import React from 'react'
import { NavLink } from 'react-router-dom'
// import homeBlack from '../assets/imgs/icons/homeBlack'

export function AppHeader() {
  return (
    <header>
      <NavLink to="/" exact>
        {/* <img src={homeBlack} alt="" /> */}
        <span>home</span>
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
