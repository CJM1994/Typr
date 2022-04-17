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

const options = {
  responsive: true,
  // maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Typing Speed',
    },
  },
};

const data = {
  labels: 'topSpeed',
  datasets: [
    {
      label: 'Dataset 1',
      data: [1, 2, 3, 4, 10],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgb(255, 99, 132)',
    },
    {
      label: 'Dataset 2',
      data: [1, 10, 3, 7, 8],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgb(53, 162, 235)',
    },
  ],
};

export default function LineChart() {

  return (
    <Line
      options={options}
      data={data}
      width={1}
      height={0.5}
    />
  )

}