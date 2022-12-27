import { useDispatch } from "react-redux";

import { signUp } from "../store/actions/userActions";

export const SignUpPage = (props) => {
  const dispatch = useDispatch();

  const onExplore = () => {
    dispatch(signUp());
    props.history.push("/");
  };

  return (
    <section className="sign-up-page">
      <section className="illustrations"></section>
      <div className="title">Welcome to <span>Crypto</span>bits</div>
      <div onClick={onExplore} className="explore pointer">
        <span>Explore</span>
        <div className="explore__icon"></div>
      </div>
    </section>
  );
};
