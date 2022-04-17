import React from "react";
import './Profile.scss';
import StatisticsBlock from "./StatisticsBlock"

export default function Profile(props) {

  // Hardcoded values, should be passed in props in the future
  const timeSpent = '4:21:34';
  const numOfLessons = '143';
  const topSpeed = '67.3'; // Need to query for percentile (ie. beats 92% of all other people)
  const avgSpeed = '50.9'; // Need to query for percentile (ie. beats 88% of all other people)
  const topSpeedPercentile = '92.81%';
  const avgSpeedPercentile = '88.82%'
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

        <h2>Compare Yourself: </h2>
        <p>Your all time top speed beats {topSpeedPercentile} of all other people.</p>
        <p>Your all time average speed beats {avgSpeedPercentile} of all other people.</p>


      </div>

    </section>
  )

}