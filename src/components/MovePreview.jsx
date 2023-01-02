import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import arrowUpGreen from "../assets/images/icons/arrow-up-green.png";
import arrowDownRed from "../assets/images/icons/arrow-down-red.png";
import { getContactById } from "../store/actions/contactActions";

export function MovePreview({ move }) {
  const { loggedInUser } = useSelector((state) => state.userModule);
  const [contact, setContact] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContactById(move.toId)).then((user) => {
      setContact(user);
    });
  }, []);

  if (!move || !contact) return;
  const isMoneyReceived = move.toId === loggedInUser._id

  return (
    <li key={move.at} className="moves__list__item">
      <img src={isMoneyReceived ? arrowUpGreen : arrowDownRed} alt="" />
      <div className="left">
        <span className="left__name">{isMoneyReceived ? loggedInUser.name : contact.name}</span>
        <span className="left__date">{new Date(move.at).toLocaleString()}</span>
      </div>
      <div className="value">
        <span> + 16$</span>
        <span className={`value__crypto ${isMoneyReceived ? "" : "red"}`}>
          {isMoneyReceived ? "+" : "-"}
          {move.amount}
          {" " + move.type}
        </span>
      </div>
    </li>
  );
}
