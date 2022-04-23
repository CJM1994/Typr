import React, { useContext } from "react";
import { UserContext } from "../App";
import "../Sidebar/SidebarButton.scss";

export default function SignedIn() {
  const { userProps } = useContext(UserContext);
  const { isAuthenticated } = userProps;
  return (
    <>
      {isAuthenticated && <div className="sideButton loggedIn">{`Logged in as:\n${userProps.user.nickname}`}</div>}
    </>
  );
};