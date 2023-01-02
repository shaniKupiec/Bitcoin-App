import React from 'react'
import { MovePreview } from './MovePreview';

export function MoveList({ movesList }) {
  if(!movesList || !movesList.length) return

  return (
    <section className="moves">
      <span className="moves__title">Previews Transactions</span>
      <ul className="moves__list clean-list">
        {movesList.map((move) => (
          <MovePreview move={move} key={move.at}/>
        ))}
      </ul>
    </section>
  )
}
