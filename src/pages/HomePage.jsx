import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import balanceCard from "../assets/images/balance-card.png";
import greenArrow from "../assets/images/icons/green-arrow.png";
import redArrow from "../assets/images/icons/red-arrow.png";

// import { MoveList } from "../components/MoveList";
import bitcoinService from "../services/bitcoin.service";

export const HomePage = (props) => {
  const { loggedInUser } = useSelector((state) => state.userModule);
  const [rate, setRate] = useState();
  const [isProfit, setIsProfit] = useState(true);

  // useEffect(() => {
  //   console.log("home page started");
  //   loadRate();
  // }, []);

  useEffect(() => {
    loadRate();
  }, [loggedInUser]);

  const loadRate = async () => {
    console.log("loadRate", loggedInUser);
    var rate1 = await bitcoinService.getRate(loggedInUser?.coins);
    rate1 = formatNum(rate1);
    setRate(rate1);
  };

  const formatNum = (rate) => {
    var formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    return formatter.format(rate);
  };

  if (!rate || !loggedInUser) return <div>Loading...</div>;
  return (
    <main className="home-page">
      <section className="card">
        <img src={balanceCard} alt="" className="card__img" />
        <div className="card__row title">Total Balance</div>
        <div className="card__row balance">
          {rate}
        </div>
        <div className="card__row footer">
          <img src={isProfit ? greenArrow : redArrow} alt="" className="footer__icon"/>
          <span className="footer__profit">{loggedInUser.coins}</span>
          <span className="footer__title">Today's Profit</span>
        </div>
      </section>
      {/* <MoveList movesList={loggedInUser.moves} title="My Moves" /> */}
    </main>
  );
};



// import Lottie from "react-lottie";
// import animationData from "../assets/animations/bitcoin.json";
// <Lottie options={this.defaultOptions} height={600} width={750} />