import React, { useContext } from "react";
import { UserContext } from "../App";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile } from '@fortawesome/free-solid-svg-icons';

export default function Login() {
  const { userProps } = useContext(UserContext);
  const { isAuthenticated, loginWithRedirect } = userProps;

  return (
    !isAuthenticated && (
      <button className="login" onClick={() => loginWithRedirect()}>
        <FontAwesomeIcon icon={faSmile} size="3x" />
        <span>Sign In</span>
      </button>
    )
  );
};