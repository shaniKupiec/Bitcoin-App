import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import balanceCard from "../assets/images/balance-card.png";
import greenArrow from "../assets/images/icons/green-arrow.png";
import redArrow from "../assets/images/icons/red-arrow.png";

import { MoveList } from "../components/MoveList";
import { loadDynamicRate } from "../store/actions/dataActions";

export const HomePage = (props) => {
  const { loggedInUser } = useSelector((state) => state.userModule);
  const [coins, setCoins] = useState();
  const [isProfit, setIsProfit] = useState(true);
  const [profit, setProfit] = useState(true);

  const dispatch = useDispatch();
  const { dynamicRates } = useSelector((state) => state.dataModule);

  useEffect(() => {
    dispatch(loadDynamicRate("BTC", 7));
  }, []);

  useEffect(() => {
    loadRate();
  }, [loggedInUser, dynamicRates]);

  const loadRate = async () => {
    let x = dynamicRates["BTC-7"];
    if (!x) return;
    const previewsValue = x[0].value;
    const todaysValue = x[x.length - 1].value;
    setCoins(loggedInUser.coins * todaysValue)
    setProfit(todaysValue - previewsValue);
    setIsProfit(todaysValue - previewsValue > 0)
  };

  const formatNum = (rate) => {
    var formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    return formatter.format(rate);
  };

  if (!loggedInUser) return <div>Loading...</div>;
  return (
    <main className="home-page add-margin">
      <section className="card">
        <img src={balanceCard} alt="" className="card__img" />
        <div className="card__row title">Total Balance</div>
        <div className="card__row balance">{formatNum(coins)}</div>
        <div className="card__row footer">
          {/* <img src={isProfit ? greenArrow : redArrow} alt="" className="footer__icon" />
          <span className="footer__profit">{formatNum(profit)}</span>
          <span>This Week's { isProfit ? "Profit" : "loss"}</span> */}
          BTC: {loggedInUser.coins} coins
        </div>
      </section>
      <MoveList movesList={loggedInUser.moves} title="My Moves" />
    </main>
  );
};
