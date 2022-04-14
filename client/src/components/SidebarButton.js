import React from "react";

import "./SidebarButton.scss";

export default function SidebarButton(props) {
  return (
    <a href={props.href}>
      <span>{props.text}</span>
    </a>
  );
};