import React, { useEffect } from "react";
import LeaderboardTable from "./LeaderboardTable";
import './Leaderboard.scss';

export default function Leaderboard(props) {

  return (
    <section className="leaderboard">
      <article className="body">
        <h1>High Scores</h1>
        <p className="text">
          The table of the fastest typists for the last few days, arranged by their scores from best to worst. 
          Typing score is measured from typing speed, text length, the number of different characters in the text, and the number of errors. 
          The formula is designed in such a way to reward for a faster speed, longer text and a larger alphabet, but to punish for the number of errors.
        </p>
        <LeaderboardTable />
      </article>
    </section>
  );

}