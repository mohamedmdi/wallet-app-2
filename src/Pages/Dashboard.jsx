import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { deleteExpence } from "../config/Slices/mainSlice";
import ExpensesModal from "../components/Modals/ExpensesModal";
import DeleteModal from "../components/Modals/DeleteModal";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Dashboard() {
  const expenses = useSelector((state) => state.main.expences);
  const incomes = useSelector((state) => state.main.incomes);
  let [isOpen, setIsOpen] = useState(false);
  let [modalContent, setModalContent] = useState({});
  let [isDeleteOpen, setDeleteOpen] = useState(false);
  const dispatch = useDispatch();
  const delItem = () => {
    dispatch(deleteExpence(modalContent.id));
    closeModal();
    closeDelete();
  };
  function closeDelete() {
    setDeleteOpen(false);
  }
  function openDelete() {
    setDeleteOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  function openModal(e) {
    setModalContent({ ...e, currency: user.currency.value });
    setIsOpen(true);
  }
  const transactions = [...expenses, ...incomes]
    .sort((a, b) => {
      let dateA = new Date(a.date);
      let dateB = new Date(b.date);
      return dateA - dateB;
    })
    .reverse();
  let salary = 0;
  const salaryChanges = [];
  for (const item of transactions.slice().reverse()) {
    if (item.id.charAt(0) === "i") {
      salary += item.price;
    } else {
      salary -= item.price;
    }
    salaryChanges.push(salary);
  }
  console.log(salaryChanges);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const labels = transactions.map((e) =>
    e.nom.length > 20 ? e.nom.substring(0, 17) + "..." : e.nom
  );
  const expencesValues = expenses.map((e) => e.price);
  const data = {
    labels: labels.reverse(),
    datasets: [
      {
        label: "",
        data: salaryChanges,
        borderColor: "RGB(0,112,192)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        pointRadius: 3,
        tension: 0.4,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: false,
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    hover: {
      mode: "index",
      intersec: false,
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Price " + user.currency.value,
        },
      },
    },
  };
  console.log(user);
  return (
    <div className="p-4">
      <ExpensesModal
        isOpen={isOpen}
        closeModal={closeModal}
        modalContent={modalContent}
        openDelete={openDelete}
      />
      <DeleteModal
        isDeleteOpen={isDeleteOpen}
        closeDelete={closeDelete}
        delItem={delItem}
      />
      <div className="flex flex-wrap justify-around items-start">
        <div className="w-1/4 bg-white p-4 rounded-lg shadow-md shadow-slate-300 flex flex-col">
          <h2 className="font-semibold text-md text-gray-500 mt-2">
            Total Balance
          </h2>
          <h2 className="text-2xl font-bold pt-3">
            {user.balance.toLocaleString()} {user.currency.value}
          </h2>
        </div>
        <div className="w-1/4 bg-white p-4 rounded-lg shadow-md shadow-slate-300 flex flex-col">
          <h2 className="font-semibold text-md text-gray-500 mt-2">
            Total Expences
          </h2>
          <h2 className="text-2xl font-bold pt-3">
            {expencesValues
              .reduce((total, currentValue) => total + currentValue, 0)
              .toLocaleString() +
              " " +
              user.currency.value}
          </h2>
          <div
            className={classNames(
              expencesValues[expencesValues.length - 1] >=
                expencesValues[expencesValues.length - 2]
                ? "bg-red-200"
                : "bg-green-200",
              "mt-2 w-min p-1 rounded-lg text-sm"
            )}
          >
            {(
              ((expencesValues[expencesValues.length - 1] -
                expencesValues[expencesValues.length - 2]) /
                expencesValues[expencesValues.length - 2]) *
              100
            ).toFixed(2) + "%"}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center bg-white p-7 rounded-lg shadow-md shadow-slate-300">
          <p className="font-bold text-xl">This Month Expenses</p>
          <div className="rounded-md mt-3"></div>
        </div>
      </div>
      <div className="mt-3 p-1 flex flex-col justify-center items-center bg-white rounded-lg shadow-md shadow-slate-300">
        <p className="font-bold text-xl my-2">Balance Tracker</p>
        <Line className="max-h-80" options={options} data={data} />
      </div>
      <div className="flex flex-col mt-3 justify-center bg-white p-7 rounded-lg shadow-md shadow-slate-300">
        <p className="font-bold text-xl">Transaction History</p>
        <div className="relative overflow-x-auto sm:rounded-lg mt-3">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="uppercase bg-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3 text-gray-900 text-md">
                  Transaction Name
                </th>
                <th scope="col" className="px-6 py-3 text-gray-900 text-md">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-gray-900 text-md">
                  Statue
                </th>
                <th scope="col" className="px-6 py-3 text-gray-900 text-md">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((i, k) => (
                <tr
                  key={k}
                  className="border-b hover:bg-gray-300"
                  onClick={() => openModal(i)}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {i.nom.length > 20 ? i.nom.substring(0, 20) + "..." : i.nom}
                  </th>
                  <td className="px-6 py-4 text-gray-900">
                    {i.price} {user.currency.value}
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    <div
                      className={classNames(
                        i.id.charAt(0) === "i" ? "bg-green-300" : "bg-red-200",
                        "w-min p-1.5 rounded-xl font-semibold"
                      )}
                    >
                      {i.id.charAt(0) === "i" ? "Income" : "Expence"}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {new Date(i.date).toLocaleString(
                      window.navigator.language,
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
