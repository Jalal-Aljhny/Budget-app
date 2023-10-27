import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import PropTypes from "prop-types";
import "./Chart.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  plugins: {
    legend: {
      llabelsabel: {
        color: "#ffffff",
      },
    },
  },
};

const Chart = ({ data, colors }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: colors,
        borderColor: "#ffffff",
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="doughnut-chart">
      <div className="doughnut-chart-box">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
};
Chart.propTypes = {
  data: PropTypes.object,
  colors: PropTypes.array,
};

export default Chart;
