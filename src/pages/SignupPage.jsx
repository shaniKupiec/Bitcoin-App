import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { signUp } from "../store/actions/userActions";

export const SignUpPage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onExplore = () => {
    dispatch(signUp());
    navigate("/");
  };

  return (
    <section className="sign-up-page">
      <section className="illustrations"></section>
      <section className="bottom">
        <div className="title">
          Welcome to <span>Crypto</span>bits
        </div>
        <div onClick={onExplore} className="explore pointer">
          <span>Explore</span>
          <div className="explore__icon"></div>
        </div>
      </section>
    </section>
  );
};
