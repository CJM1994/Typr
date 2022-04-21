import React from 'react';
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const chartTitle = {
  wordsPerMin: 'Typing Speed (Words Per Minute)',
  accuracy: 'Percentage Accuracy',
}

const dataLabel = {
  wordsPerMin: 'Your Speed Over Time',
  accuracy: 'Your Accuracy Over Time',
}

const generateLabel = (xAxisStart, iterateBy, data) => {
  return data.map(() => { return (xAxisStart += iterateBy).toString() });
};

const getStatisticsData = (statistics, dataSelection) => {
  const statisticsData = [];

  for (const dataPoint of statistics) {
    if (dataSelection === 'accuracy') {
      statisticsData.push(dataPoint[dataSelection] * 100);
    } else {
      statisticsData.push(dataPoint[dataSelection]);
    }
  };

  return statisticsData;
};

export default function LineChart(props) {

  const { statistics, dataSelection } = props;
  const displayData = getStatisticsData(statistics, dataSelection);
  const label = generateLabel(0, 1, displayData);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: chartTitle[dataSelection],
      },
    },
    scales: {
      x: {
        min: 0,
        max: displayData.length
      },
      y: {
        min: Math.min(...displayData) - 10,
        max: Math.max(...displayData) + 10
      }
    }
  };

  const data = {
    labels: label,
    datasets: [
      {
        label: dataLabel[dataSelection],
        data: displayData,
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgb(154, 208, 245)',
      }
    ],
  };

  return (
    <Line
      options={options}
      data={data}
      width={1}
      height={0.5}
    />
  )

}