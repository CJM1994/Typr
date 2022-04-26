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
    const getData = async () => {
      await axios
        .get(`https://code-typr.herokuapp.com/user/${email}`)
        .then((res) => {
          const userStatistics = res.data[0].statistics;
          const todaysDate = new Date(Date.now());

          let allTimeWordsPerMin = 0;
          let allTimeSpent = 0;
          let todaysWordsPerMin = 0;
          let todaysTimeSpent = 0;
          let todaysLessons = 0;
          let todaysTopScore = 0;
          let todaysScore = 0;
          let i = 0;

          for (const dataPoint of userStatistics) {
            allTimeWordsPerMin += dataPoint.wordsPerMin;
            allTimeSpent += dataPoint.timeSpent;
            const dataDate = new Date(dataPoint.createdAt);
            if (todaysDate.getDate() === dataDate.getDate()) {
              todaysScore = calculateScore(
                dataPoint.wordsPerMin,
                dataPoint.accuracy
              );
              todaysWordsPerMin += dataPoint.wordsPerMin;
              todaysTimeSpent += dataPoint.timeSpent;
              todaysLessons++;
              todaysTopScore =
                todaysScore > todaysTopScore ? todaysScore : todaysTopScore;
            }
            i++;
          }

          setStats((prev) => {
            return {
              ...prev,
              avgSpeed: allTimeWordsPerMin / i,
              totalLessons: res.data[0].statistics.length,
              totalLessonsToday: todaysLessons,
              totalTimeSpent: formatFromSeconds(allTimeSpent),
              topScore: Math.round(todaysTopScore) > res.data[0].greatestScore ? Math.round(todaysTopScore) : res.data[0].greatestScore,
              totalTimeSpentToday: formatFromSeconds(todaysTimeSpent),
              avgSpeedToday: todaysWordsPerMin / i,
              topScoreToday: Math.round(todaysTopScore),
              data: res.data[0].statistics,
            };
          });
          return res;
        })
        .then((thisUser) => {
          axios.get(`https://code-typr.herokuapp.com/users`).then((res) => {
            const users = res.data;
            const numOfUsers = res.data.length;
            let scoreRank = 0;

            for (const user of users) {
              if (user.greatestScore > thisUser.data[0].greatestScore) {
                scoreRank++;
              }
            }
            setStats((prev) => {
              return {
                ...prev,
                scorePercentile: (1 - scoreRank / numOfUsers) * 100,
              };
            });
          });
        });
    };
    email && getData();
  }, [email]);

  return stats;
}
