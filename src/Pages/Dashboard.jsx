import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useSelector } from "react-redux";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const expenses = useSelector((state) => state.main.expences);
  const user = JSON.parse(localStorage.getItem("user"));
  const labels = expenses.map((e) => e.nom);
  const expencesValues = expenses.map((e) => e.value);
  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: expencesValues,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        pointRadius: 3,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: false,
    },
  };
  console.log(user);
  return (
    <div className="grid grid-cols-2 m-12">
      <div className="flex flex-col items-center">
        <h2 className="font-bold text-xl mb-3">Balance</h2>
        <span className="text-lg inline-block">
          {user.balance} {user.currency.value}
        </span>
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className="font-bold text-xl">This Month Expenses</p>
        <div className="rounded-md p-8 mt-3">
          <Line options={options} data={data} />
        </div>
      </div>
    </div>
  );
}
