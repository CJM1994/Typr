import React from 'react';
import './Multiplayer.scss'
import useSocket from '../../hooks/useSocket';
import MultiDisplay from './MultiDisplay';
import { useEffect, useState } from "react";

export default function Multiplayer() {



  useSocket();

  return (<MultiDisplay />)

};

// What to do for mp functionality
// Make game room for new connections
// When 2 players connected send prompt to players (Hardcode for now)
// When a player finishes their prompt send complete back to Server
// When all players send complete to server, server sends back game result