import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import Chart from "chart.js/auto";

type Props = {
  chartData: {
    labels: string[] | undefined;
    datasets: {
      label: string;
      data: (string | number | undefined)[] | undefined;
    }[];
  };
  options: {
    responsive: boolean;
    scales: {
      x: {
        offset: boolean;
      };
    };
    plugins: {
      legend: {
        position: "left";
      };
    };
  };
};

ChartJS.register(...registerables);

const LineChart = ({ chartData, options }: Props) => {
  return <Line data={chartData} options={options} data-testid="cart-chart" />;
};

export default LineChart;
