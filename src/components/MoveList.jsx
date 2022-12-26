import React from 'react'

export function MoveList({ title, movesList }) {

  if(!movesList || !movesList.length) return

  return (
    <section className="moves">
      <span className="moves__title">{title}</span>
      <ul className="moves__list clean-list">
        {movesList.map((move) => (
          <li key={move.at} className="moves__list__item">
            <span>to: {move.to}</span>
            <span>at: {new Date(move.at).toLocaleString()}</span>
            <span>amount: {move.amount} coins</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
