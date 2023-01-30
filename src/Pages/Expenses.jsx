import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExpence } from "../config/Slices/mainSlice";

export default function Expenses() {
  const [amount, setAmount] = useState("");
  const [label, setLabel] = useState("");
  const expences = useSelector((state) => state.main.expences);
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const handelClick = () => {
    if(amount !== "" && label !== "")
    dispatch(
      addExpence({
        id: expences.length + 1,
        nom: label,
        value: parseFloat(amount),
      })
    );

    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        balance: parseFloat(user.balance) - parseFloat(amount),
      })
    );
  };
  return (
    <div className="flex flex-col items-center mt-10">
      <div className="flex gap-5 mx-7 flex-wrap justify-center">
        {expences.map((e, k) => (
          <div key={k}>
            <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {e.nom}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {e.value} {user.currency.value}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div>Add Expences</div>
      <div className="overflow-visible  sm:rounded-md flex flex-col mt-5 items-center">
        <div className="bg-white px-4 py-5 sm:p-6 rounded">
          <div className="grid">
            <div className="col-span-6 sm:col-span-4">
              <label
                htmlFor="label"
                className="block text-sm font-medium text-gray-700"
              >
                Label 🏷️
              </label>
              <input
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                type="text"
                name="label"
                id="label"
                className="font-semibold mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="col-span-6 sm:col-span-4 mt-5">
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                Amount 💰
              </label>
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                min={1}
                name="amount"
                id="amount"
                className="font-semibold mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="col-span-6 sm:col-span-4 mt-5">
              <button
                onClick={handelClick}
                className="justify-center
                      h-10
                      w-full
                      rounded-md border 
                      border-transparent 
                      bg-orange-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add Expense
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
