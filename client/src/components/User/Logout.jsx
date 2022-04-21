import React, { useContext } from "react";
import { UserContext } from "../App";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile } from '@fortawesome/free-solid-svg-icons';


export default function Logout() {
  const { userProps } = useContext(UserContext);
  const { isAuthenticated, logout } = userProps;
  console.log(userProps.user)
  return (
    isAuthenticated && (
      <button className="login" onClick={() => logout()}>
        <FontAwesomeIcon icon={faSmile} size="3x" />
        <span>Sign Out</span>
      </button>
    )
  );
};