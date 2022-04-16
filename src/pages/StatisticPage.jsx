import React from 'react'
import { Chart } from '../components/Chart'

export function StatisticPage() {
  return (
    <section>
      <Chart title="Confirmed Transactions" data="confirmedtransactions" description="" color="blue" />
      <Chart title="Market Price" data="marketprice" description="" color="red" />
    </section>
  )
}
