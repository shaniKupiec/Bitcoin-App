import React from "react";
import { NavLink } from "react-router-dom";

export function AppHeader() {
  return (
    <header>
      <NavLink to="/" exact className="home link">
        <div className="home__icon icon"></div>
        <span>home</span>
      </NavLink>
      <NavLink to="/contact" className="contact link">
        <div className="contact__icon icon"></div>
        <span>contact</span>
      </NavLink>
      <NavLink to="/chart" className="chart link">
        <div className="chart__icon icon"></div>
        <span>chart</span>
      </NavLink>
      <NavLink to="/chart" className="chart link">
        <div className="chart__icon icon"></div>
        <span>chart</span>
      </NavLink>
    </header>
  );
}
