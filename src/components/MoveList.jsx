import React from 'react'
import { useSelector } from 'react-redux';

import arrowUpGreen from '../assets/images/icons/arrow-up-green.png';
import arrowDownRed from '../assets/images/icons/arrow-down-red.png';

export function MoveList({ title, movesList }) {
  const { loggedInUser } = useSelector((state) => state.userModule);


  if(!movesList || !movesList.length) return

  return (
    <section className="moves">
      <span className="moves__title">Previews Transactions</span>
      <ul className="moves__list clean-list">
        {movesList.map((move) => (
          <li key={move.at} className="moves__list__item">

            <img src={move.to === loggedInUser.name ? arrowUpGreen : arrowDownRed} alt="" />
            <div className='left'>
              <span className='left__name'>{move.to === loggedInUser.name ? move.from : move.to}</span>
              <span className='left__date'>{new Date(move.at).toLocaleString()}</span>
            </div>
            <div className='value'>
              <span> + 16$</span>
              <span className={`value__crypto ${move.to === loggedInUser.name ? '' : 'red'}`}>
                {move.to === loggedInUser.name ? '+' : '-'}
                {move.amount}
                {' ' + move.type}
              </span>
            </div>



            {/* <span>to: {move.to}</span>
            <span>at: {new Date(move.at).toLocaleString()}</span>
            <span>amount: {move.amount} coins</span> */}
          </li>
        ))}
      </ul>
    </section>
  )
}
