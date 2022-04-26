import React, { useContext } from "react";
import { UserContext } from "../App";

export default function Logout() {
  const { userProps } = useContext(UserContext);
  const { isAuthenticated, logout } = userProps;
  console.log(userProps.user)
  return (
    isAuthenticated && (
      <button className="login" onClick={() => logout()}>
        <img src={userProps.user.picture} size="3x" />
        <span>Sign Out</span>
      </button>
    )
  );
};