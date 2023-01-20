import { Chart } from "chart.js/auto";
import { useCallback } from "react";

export const ChartInfo = (props) => {
  const mostUpvoted = props.data.filter((data) => data.upvotes >= 25);

  const createChart = useCallback((canvas) => {
    new Chart(canvas, {
      type: "pie",
      data: {
        labels: mostUpvoted.map((row) => row.category), //map through categories
        datasets: [
          {
            label: "upvotes",
            data: mostUpvoted.map((row) => row.upvotes),
          },
        ],
      },
    });
  }, []);

  return (
    <div style={{ width: "50%", margin: "0 auto" }}>
      <canvas ref={createChart}></canvas>
    </div>
  );
};
