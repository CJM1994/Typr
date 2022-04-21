import React, { useContext, useState, useEffect } from "react";
import './Profile.scss';
import StatisticsBlock from "./StatisticsBlock";
import LineChart from './Charts/Line';
import useGetUserStatistics from "../../hooks/useGetUserStatistics";
import { UserContext } from "../App";
import NotLoggedIn from "./NotLoggedIn";

export default function Profile(props) {
  const { userProps } = useContext(UserContext);
  const stats = useGetUserStatistics(userProps?.user?.email);
  // Use this hook to retrieve user data for the StatisticsBlock component
  if (userProps.isAuthenticated) {
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
            topScore={Math.round(stats.topScore)}
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
          <p className="text">Your all time top score beats {Math.round(stats.scorePercentile)}% of all other people.</p>
        </article>
      </section>
    );
  }
  return <NotLoggedIn/>
}