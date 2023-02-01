import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpence } from "../config/Slices/mainSlice";
import ExpensesModal from "../components/Modals/ExpensesModal";
import DeleteModal from "../components/Modals/DeleteModal";
import AddExpenceModal from "../components/Modals/AddExpenceModal";

export default function Expenses() {
  const expences = useSelector((state) => state.main.expences);
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  let [isOpen, setIsOpen] = useState(false);
  let [modalContent, setModalContent] = useState({});
  let [isDeleteOpen, setDeleteOpen] = useState(false);
  let [isAddOpen, setIsAddOpen] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const delItem = () => {
    dispatch(deleteExpence(modalContent.id));
    closeModal();
    closeDelete();
  };
  function closeDelete() {
    setDeleteOpen(false);
  }
  function closeAdd() {
    setIsAddOpen(false);
  }
  function openDelete() {
    setDeleteOpen(true);
  }
  function openAdd() {
    setIsAddOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModal(e) {
    setModalContent({ ...e, currency: user.currency.value });
    setIsOpen(true);
  }
  return (
    <div className="flex flex-col items-center mt-10">
      <div className="flex gap-5 mx-7 flex-wrap justify-center items-center">
        {expences.map((e, k) => (
          <div key={k}>
            <div
              onClick={() => openModal(e)}
              className=" flex cursor-pointer flex-col w-40 h-40 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <h5 className="mb-2 max-h-28 overflow-hidden text-ellipsis text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {e.nom}
              </h5>
              <div class="flex-1"></div>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {e.price} {user.currency.value}
              </p>
            </div>
          </div>
        ))}
        <div
          onClick={() => openAdd()}
          className=" flex items-center justify-center cursor-pointer w-36 h-36 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            +
          </h1>
        </div>
      </div>
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
      <AddExpenceModal isAddOpen={isAddOpen} closeAdd={closeAdd} />
    </div>
  );
}
