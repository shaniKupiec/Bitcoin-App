import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getContactById } from "../store/actions/contactActions";
import { loadDynamicRate } from "../store/actions/dataActions";

import arrowUpGreen from "../assets/images/icons/arrow-up-green.png";
import arrowDownRed from "../assets/images/icons/arrow-down-red.png";

export function MovePreview({ move }) {
  const { loggedInUser } = useSelector((state) => state.userModule);
  const { dynamicRates } = useSelector((state) => state.dataModule);
  const dispatch = useDispatch();
  const [contact, setContact] = useState();
  const [profit, setProfit] = useState(true);

  useEffect(() => {
    dispatch(getContactById(move.toId))
      .then((user) => {
        setContact(user);
      })
      .catch(() => {
        setContact({
          name: "unknown contact",
        });
      });
    dispatch(loadDynamicRate(move.type, 1825));
  }, []);

  useEffect(() => {
    loadRate();
  }, [dynamicRates]);

  const loadRate = async () => {
    let x = dynamicRates[move.type + "-1825"];
    if (!x) return;
    setProfit(x[10].value * move.amount);
  };

  const formatNum = (rate) => {
    var formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    return formatter.format(rate);
  };

  if (!move || !contact) return;
  const isProfit = move.toId === loggedInUser._id;

  return (
    <li key={move.at} className="move-preview">
      <img src={isProfit ? arrowUpGreen : arrowDownRed} alt="" />
      <div className="left">
        <span className="left__name">{isProfit ? loggedInUser.name : contact.name}</span>
        <span className="left__date">{new Date(move.at).toLocaleString()}</span>
      </div>
      <div className="value">
        <span>
          {isProfit ? "+" : "-"} {formatNum(profit)}
        </span>
        <span className={`value__crypto ${isProfit ? "" : "red"}`}>
          {isProfit ? "+" : "-"}
          {move.amount}
          {" " + move.type}
        </span>
      </div>
    </li>
  );
}
