import { useDispatch } from "react-redux";

import { signUp } from "../store/actions/userActions";

export const SignUpPage = (props) => {
  const dispatch = useDispatch();

  const onExplore = () => {
    dispatch(signUp());
    props.history.push("/");
  };

  return <button onClick={onExplore}>submit</button>;
};
