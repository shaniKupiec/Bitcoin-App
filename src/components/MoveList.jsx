import React from 'react'

export function MoveList({ title, movesList }) {
  return (
    <section className="move-list">
      <span className="title">{title}</span>
      {console.log('movesList', movesList)}
      <ul>
        {movesList.map((move) => (
          <li key={move.at}>
            <span className="item">
              <span>to:</span>
              <span>{move.to}</span>
            </span>
            <span className="item">
              <span>to id:</span>
              <span>{move.toId}</span>
            </span>
            <span className="item">
              <span>at:</span>
              <span>{move.at}</span>
            </span>
            <span className="item">
              <span>amount:</span>
              <span>{move.amount}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
