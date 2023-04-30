import React from "react";
import { Radar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function RadarChart({ chartData }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scale: {
      r: {
        beginAtZero: true,
        min: 0,
        ticks: {
          stepSize: 20,
        },
      },
    },
    plugins: {
      legend: {
        align: "start",
        // position: "left",
        labels: {
          usePointStyle: true,
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return <Radar data={chartData} options={options} />;
}
