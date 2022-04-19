import React from 'react';
import './StatisticsBlock.scss';

export default function StatisticsBlock(props) {
  const {timeSpent, numOfLessons, topScore, avgSpeed} = props;

  return (
    <p className="statistics-block">
      <span className="frame">
        <span className="inner top" title="Time spent on exercises">Total Time: </span>
        <span className="inner bottom">{timeSpent}</span>
      </span>

      <span className="frame">
        <span className="inner top" title="Number of lessons completed">Total Lessons: </span>
        <span className="inner bottom">{numOfLessons}</span>
      </span>

      <span className="frame">
        <span className="inner top" title="Top score">Top Score</span>
        <span className="inner bottom">{topScore}</span>
      </span>

      <span className="frame">
        <span className="inner top" title="Average typing speed">Average Speed (wpm)</span>
        <span className="inner bottom">{avgSpeed}</span>
      </span>
    </p>
  );
};