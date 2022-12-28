import React from "react";
import { useState } from "react";
import { RatePreview } from "../components/RatePreview";

import bitcoinIcon from "../assets/images/cryptoIcons/BTC.png";
import tethereumIcon from "../assets/images/cryptoIcons/ETH.png";
import tetherIcon from "../assets/images/cryptoIcons/USDT.png";
import binanceIcon from "../assets/images/cryptoIcons/BNB.png";
import andoraIcon from "../assets/images/cryptoIcons/ADA.png";
import XRPIcon from "../assets/images/cryptoIcons/XRP.png";
import dogecoinIcon from "../assets/images/cryptoIcons/DOGE.png";
import USDIcon from "../assets/images/cryptoIcons/USDC.png";
import polkadotIcon from "../assets/images/cryptoIcons/DOT.png";
import uniswapIcon from "../assets/images/cryptoIcons/UNI.png";

export function MarketPage() {
  const [select, setSelect] = useState(1825);
  const selectArray = [
    { days: 7, value: "1W" },
    { days: 30, value: "1M" },
    { days: 150, value: "5M" },
    { days: 365, value: "1Y" },
    { days: 1825, value: "5Y" },
  ];
  const cryptoArray = [
    {
      name: "Bitcoin",
      shortName: "BTC",
      imgSrc: bitcoinIcon,
    },
    {
      name: "Tethereum",
      shortName: "ETH",
      imgSrc: tethereumIcon,
    },
    {
      name: "Tether",
      shortName: "USDT",
      imgSrc: tetherIcon,
    },
    {
      name: "Binance Coin",
      shortName: "BNB",
      imgSrc: binanceIcon,
    },
    {
      name: "Andora",
      shortName: "ADA",
      imgSrc: andoraIcon,
    },
    {
      name: "XRP",
      shortName: "XRP",
      imgSrc: XRPIcon,
    },
    {
      name: "Dogecoin",
      shortName: "DOGE",
      imgSrc: dogecoinIcon,
    },
    {
      name: "USD Coin",
      shortName: "USDC",
      imgSrc: USDIcon,
    },
    {
      name: "Polkadot",
      shortName: "DOT",
      imgSrc: polkadotIcon,
    },
    {
      name: "Uniswap",
      shortName: "UNI",
      imgSrc: uniswapIcon,
    },
  ];

  return (
    <main className="market-page">
      <section className="select">
        {selectArray.map(({ days, value }) => {
          return (
            <div key={days} onClick={() => setSelect(days)} className={select === days ? "active" : ""}>
              {value}
            </div>
          );
        })}
      </section>
      <section className="rates">
        {cryptoArray.map((value) => {
          return <RatePreview key={value.name} name={value.name} shortName={value.shortName} imgSrc={value.imgSrc} days={select} />;
        })}
      </section>
    </main>
  );
}
