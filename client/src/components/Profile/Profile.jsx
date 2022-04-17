import React from "react";
import './Profile.scss';
import StatisticsBlock from "./StatisticsBlock"

export default function Profile(props) {

  // Hardcoded values, should be passed in props in the future
  const timeSpent = '4:21:34';
  const numOfLessons = '143';
  const topSpeed = '67.3';
  const avgSpeed = '50.9';
  // End of hardcoded values

  return (
    <section className="profile">

      <article class="welcome">
        <h1>My Profile</h1>
        <p>This is a page with detailed statistics about your learning progress.
          The more lessons you complete, the<br /> more detailed and accurate these statistics will be.
        </p>
      </article>

      <div id="statistics">
        <h2>All Time Statistics: </h2>
        <StatisticsBlock
          timeSpent={timeSpent}
          numOfLessons={numOfLessons}
          topSpeed={topSpeed}
          avgSpeed={avgSpeed}
        />

        <h2>Statistics for Today: </h2>
        <StatisticsBlock
          timeSpent={timeSpent}
          numOfLessons={numOfLessons}
          topSpeed={topSpeed}
          avgSpeed={avgSpeed}
        />

      </div>

    </section>
  )

}