import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { addExpence } from "../../config/Slices/mainSlice";

export default function AddExpenceModal({ isAddOpen, closeAdd }) {
  const [label, setLabel] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const dispatch = useDispatch();
  const expences = useSelector((state) => state.main.expences);
  const user = JSON.parse(localStorage.getItem("user"));

  const handelClick = () => {
    if (price !== "" && label !== "" && date !== "") {
      dispatch(
        addExpence({
          id: expences.length + 1,
          nom: label,
          price: parseFloat(price),
          desc: desc,
          date: date,
        })
      );

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          balance: parseFloat(user.balance) - parseFloat(price),
        })
      );
      closeAdd();
      setLabel("");
      setPrice("");
      setDate("");
    }
  };
  return (
    <div>
      <Transition appear show={isAddOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeAdd}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add Expences
                  </Dialog.Title>
                  <div className="mt-2">
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
                          htmlFor="price"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Price 💰 ({user.currency.value})
                        </label>
                        <input
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          type="number"
                          min={1}
                          name="price"
                          id="price"
                          className="font-semibold mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-4 mt-5">
                        <label
                          htmlFor="desc"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Description 📃
                        </label>
                        <textarea
                          value={desc}
                          onChange={(e) => setDesc(e.target.value)}
                          name="desc"
                          id="desc"
                          className="font-semibold mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-4 mt-5">
                        <label
                          htmlFor="Date"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Date 💰
                        </label>
                        <input
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          type="datetime-local"
                          min={1}
                          name="Date"
                          id="Date"
                          className="font-semibold mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-row justify-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handelClick}
                    >
                      Add Expence
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
