import React, { useState, useEffect } from "react";
import './Profile.scss';
import StatisticsBlock from "./StatisticsBlock"
import LineChart from './Charts/Line'
import axios from "axios";
import { formatFromSeconds } from '../../helpers/helpers';

export default function Profile(props) {

  const [state, setState] = useState({
    avgSpeed: 0,
    totalLessons: 0,
    totalTimeSpent: 0,
    topScore: 0
  });

  // Hardcoded test email address
  const email = 'test9@test.test'
  // End of test values

  useEffect(() => {
    axios.get(`/user/${email}`)
      .then(res => {
        const userStatistics = res.data[0].statistics;

        let allTimeChars = 0;
        let allTimeSpent = 0;

        for (const dataPoint of userStatistics) {
          allTimeChars += dataPoint.totalChars;
          allTimeSpent += dataPoint.timeSpent;
        }

        setState({
          avgSpeed: (allTimeChars / 5) / (allTimeSpent / 60),
          totalLessons: res.data[0].statistics.length,
          totalTimeSpent: formatFromSeconds(allTimeSpent),
          topScore: res.data[0].greatestScore
        });
      })
  }, [])



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
          timeSpent={state.totalTimeSpent}
          numOfLessons={state.totalLessons}
          topScore={state.topScore}
          avgSpeed={Math.round(state.avgSpeed)}
        />

        <h2>Statistics for Today: </h2>
        <StatisticsBlock
          timeSpent={state.totalTimeSpent}
          numOfLessons={state.totalLessons}
          topScore={state.topScore}
          avgSpeed={Math.round(state.avgSpeed)}
        />

        <h2>Compare Yourself: </h2>
        <p>Your all time top score beats --- of all other people.</p>
        <p>Your all time average speed beats --- of all other people.</p>

        {/* Implementing graphs below -Connor */}

        {/* <hr />
        <div className='chart-wrapper'><LineChart statistics={statistics} dataSelection={'wordsPerMinute'} /></div>
        <hr />
        <div className='chart-wrapper'><LineChart statistics={statistics} dataSelection={'accuracy'} /></div> */}

      </div>

    </section>
  )

}