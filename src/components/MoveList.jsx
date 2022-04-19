import React from 'react'

export function MoveList({ title, movesList }) {
    
  return (
    <section className="moves">
      <span className="moves__title">{title}</span>
      {console.log('movesList', movesList)}
      <ul className="moves__list clean-list">
        {movesList.map((move) => (
          <li key={move.at} className="moves__list__item">
            <span>to: {move.to}</span>
            <span>to: {move.at}</span>
            <span>amount: {move.amount}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
