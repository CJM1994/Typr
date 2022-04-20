import React, { usestats, useEffect } from "react";
import './Profile.scss';
import StatisticsBlock from "./StatisticsBlock"
import LineChart from './Charts/Line'
import useGetUserStatistics from "../../hooks/useGetUserStatistics";

export default function Profile(props) {

  // Use this hook to retrieve user data for the StatisticsBlock component
  const stats = useGetUserStatistics('test9@test.test');
  console.log('data', stats.data);

  return (
    <section className="profile">
      <article class="welcome">
        <h1>My Profile</h1>
        <p className="text">
          This is a page with detailed statistics about your learning progress.
          The more lessons you complete, the more detailed and accurate these statistics will be.
        </p>

        <div className="charts">
          <div className='chart-wrapper'>
            <LineChart
              statistics={stats.data}
              dataSelection={'accuracy'}
            />
          </div>

          <div className='chart-wrapper'>
            <LineChart
              statistics={stats.data}
              dataSelection={'wordsPerMin'}
            />
          </div>
        </div>

        <h2>All Time Statistics:</h2>
        <StatisticsBlock
          timeSpent={stats.totalTimeSpent}
          numOfLessons={stats.totalLessons}
          topScore={stats.topScore}
          avgSpeed={Math.round(stats.avgSpeed)}
        />

        <h2>Daily Statistics:</h2>
        <StatisticsBlock
          timeSpent={stats.totalTimeSpentToday}
          numOfLessons={stats.totalLessonsToday}
          topScore={stats.topScoreToday}
          avgSpeed={Math.round(stats.avgSpeedToday)}
        />

        <h2>Compare Yourself: </h2>
        <p className="text">Your all time top score beats {stats.scorePercentile}% of all other people.</p>
      </article>
    </section>
  );
}