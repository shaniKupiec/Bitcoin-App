import React from "react";
import { useState } from "react";
import { Chart } from "../components/Chart";

export function MarketPage() {
  const [select, setSelect] = useState("1W");

  return (
    <main className="market-page add-margin">
      <section className="select">
       { ['1W', '1M', '5M', '1Y', '5Y'].map(value => {
          return <div onClick={() => setSelect(value)} className={select === value ? 'active' : ''}>{value}</div>
        })}
      </section>
      {select}
      <section>values</section>
    </main>
  );
}
