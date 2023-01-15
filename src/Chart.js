import { Chart } from "chart.js/auto";

export const ChartInfo = (props) => {
  const createChart = (canvas) => {
    new Chart(canvas, {
      type: "pie",
      data: {
        labels: props.data.map((row) => row.category), //map through categories
        datasets: [
          {
            label: "upvotes",
            data: props.data.map((row) => row.upvotes),
          },
        ],
      },
    });
  };

  return (
    <div>
      <canvas ref={createChart}></canvas>
    </div>
  );
};
