import React from 'react';
import './Multiplayer.scss'
const {io} = require('socket.io-client');

export default function Multiplayer() {

  io();

  return(
    <div>client</div>
  )

}