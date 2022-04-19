import React, { useState, useEffect } from "react";
import axios from "axios";
import { formatFromSeconds, calculateScore } from "../helpers/helpers";

export default function useGetUserStatistics(email) {
  const [stats, setStats] = useState({
    avgSpeed: 0,
    avgSpeedToday: 0,
    totalTimeSpent: 0,
    totalTimeSpentToday: 0,
    totalLessons: 0,
    totalLessonsToday: 0,
    topScore: 0,
    topScoreToday: 0,
    scorePercentile: 0,
    data: [],
  });

  useEffect(() => {
    axios.get(`/user/${email}`).then((res) => {
      const userStatistics = res.data[0].statistics;
      const todaysDate = new Date(Date.now());

      let allTimeChars = 0;
      let allTimeSpent = 0;
      let todaysChars = 0;
      let todaysTimeSpent = 0;
      let todaysLessons = 0;
      let todaysTopScore = 0;
      let todaysScore = 0;

      for (const dataPoint of userStatistics) {
        allTimeChars += dataPoint.totalChars;
        allTimeSpent += dataPoint.timeSpent;
        const dataDate = new Date(dataPoint.createdAt);
        if (todaysDate.getDate() === dataDate.getDate()) {
          todaysScore = calculateScore(
            dataPoint.totalChars / 5,
            dataPoint.accuracy
          );
          todaysChars += dataPoint.totalChars;
          todaysTimeSpent += dataPoint.timeSpent;
          todaysLessons++;
          todaysTopScore =
            todaysScore > todaysTopScore ? todaysScore : todaysTopScore;
        }
      }

      setStats((prev) => {
        return {
          ...prev,
          avgSpeed: allTimeChars / 5 / (allTimeSpent / 60),
          totalLessons: res.data[0].statistics.length,
          totalLessonsToday: todaysLessons,
          totalTimeSpent: formatFromSeconds(allTimeSpent),
          topScore: res.data[0].greatestScore,
          totalTimeSpentToday: formatFromSeconds(todaysTimeSpent),
          avgSpeedToday: todaysChars / 5 / (allTimeSpent / 60),
          topScoreToday: Math.round(todaysTopScore),
          data: res.data[0].statistics
        };
      });
    // })
    // .then((prev) => {
    //   // NEED TO FIX THIS REQUEST, CALL MENTOR AT 12
    //   axios.get(`/users`).then((res) => {
    //     const users = res.data;
    //     const numOfUsers = res.data.length;
    //     let scoreRank = 0;
  
    //     for (const user of users) {
    //       if (user.greatestScore > stats.topScore) {
    //         scoreRank++;
    //       } 
    //     }
    //     setStats((prev) => {
    //       // console.log(scoreRank, numOfUsers);
    //       return {
    //         ...prev,
    //         scorePercentile: 100 - scoreRank / numOfUsers,
    //       };
    //     });
    //   });

    })

    

  }, []);

  return stats;
}
