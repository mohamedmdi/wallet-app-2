import React, { useEffect, useState } from "react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import Select from "react-tailwindcss-select";
import currencies from "../utils/currencies";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../config/Slices/mainSlice";
import CreditCard from "../components/CreditCard";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login({ isAuthenticated, logIn }) {
  const [name, setName] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [email, setEmail] = useState("");
  const [currency, setCurrency] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState({ MM: "", YY: "" });
  const [balance, setBalance] = useState("");
  const [error, setError] = useState(false);
  const currentYear = new Date().getFullYear().toString().slice(-2);
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState();
  useEffect(() => {
    if (user && user.name !== null) {
      setName(user.name);
      setCardHolder(user.cardHolder);
      setEmail(user.email);
      setCurrency(user.currency);
      setCardNumber(user.cardNumber);
      setExpiry(user.expiry);
      setBalance(user.balance);
    }
  }, []);

  useEffect(() => {
    setIsAuth(localStorage.getItem("isAuthenticated"));
  }, []);

  const handleChange = (value) => {
    setCurrency(value);
  };
  function toggleAlert() {
    setError(!error);
  }
  function validateEmail(email) {
    var re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  const checkIfEmpty = () => {
    if (name == "") return false;
    if (email == "" || !validateEmail(email)) return false;
    if (currency.value == undefined) return false;
    if (cardHolder == "") return false;
    if (cardNumber == "" || cardNumber.length > 16) return false;
    if (balance == "") return false;
    if (expiry.MM == "") return false;
    if (expiry.YY == "" || expiry.YY < currentYear) return false;
    return true;
  };
  const handelSubmit = () => {
    const check = checkIfEmpty();
    if (!check) {
      setError(true);
      return;
    } else {
      dispatch(
        setUser({
          user: {
            name: name,
            email: email,
            currency: currency,
            cardHolder: cardHolder,
            cardNumber: cardNumber,
            balance: parseFloat(balance),
            expiry: { MM: expiry.MM, YY: expiry.YY },
          },
        })
      );
      if (user === null) {
        logIn({
          name: name,
          email: email,
          currency: currency,
          cardHolder: cardHolder,
          cardNumber: cardNumber,
          balance: parseFloat(balance),
          expiry: { MM: expiry.MM, YY: expiry.YY },
        });
      } else if (isAuth) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: name,
            email: email,
            currency: currency,
            cardHolder: cardHolder,
            cardNumber: cardNumber,
            balance: parseFloat(balance),
            expiry: { MM: expiry.MM, YY: expiry.YY },
          })
        );
      }
      navigate("/");
    }
  };
  return (
    <>
      <div className="flex justify-center items-center w-full flex-col min-h-screen">
        <div className="p-6" style={{ width: "100%" }}>
          <div className="mt-10 sm:mt-0 shadow sm:rounded-md bg-gray-100">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1 p-3 ">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Personal Information 📝
                  </h3>
                </div>
              </div>
              <div className="mt-5 md:col-span-2 md:mt-0">
                <div onSubmit={handelSubmit}>
                  <div className="overflow-visible  sm:rounded-md">
                    <div className="bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Name 🧑
                          </label>
                          <input
                            placeholder="Flan Fertlan"
                            value={name}
                            onChange={(e) => e.target.value.length < 25 &&
                              setName(e.target.value)}
                            type="text"
                            name="name"
                            id="name"
                            className="font-semibold mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-4">
                          <label
                            htmlFor="email-address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email address 📧
                          </label>
                          <input
                            placeholder="flan@mail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            name="email-address"
                            id="email-address"
                            className="font-semibold mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="country"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Currency 💵
                          </label>
                          <Select
                            primaryColor={"indigo"}
                            value={currency}
                            onChange={handleChange}
                            options={currencies}
                            isSearchable={true}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden sm:block" aria-hidden="true">
              <div className="py-5">
                <div className="border-t border-gray-200" />
              </div>
            </div>
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1 p-3 ">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Balance Information 📝
                  </h3>
                </div>
              </div>
              <div className="mt-5 md:col-span-2 md:mt-0 ">
                <div
                  onSubmit={handelSubmit}
                  className="flex justify-between flex-col"
                >
                  <div className="flex justify-between bg-white px-4 py-5 sm:p-6 items-center">
                    <div className="overflow-visible  sm:rounded-md flex-1">
                      <div className="bg-white px-4 py-5 sm:p-6">
                        <div className="grid grid-cols-6 gap-6">
                          <div className="col-span-6">
                            <label
                              htmlFor="cardName"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Card Holder 🧑
                            </label>
                            <input
                              placeholder="Flan Fertelan"
                              value={cardHolder}
                              onChange={(e) =>
                                e.target.value.length < 25 &&
                                setCardHolder(e.target.value)
                              }
                              type="text"
                              name="cardName"
                              id="cardName"
                              className="font-semibold mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                          <div className="col-span-6">
                            <label
                              htmlFor="cardNumber"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Card Number 💳
                            </label>
                            <input
                              value={cardNumber}
                              placeholder="e.g. 123456789123456"
                              onChange={(e) => {
                                if (
                                  e.target.value === "" ||
                                  (!isNaN(e.target.value) &&
                                    e.target.value.length <= 16)
                                ) {
                                  setCardNumber(e.target.value);
                                }
                              }}
                              type="text"
                              name="cardNumber"
                              id="cardNumber"
                              className="font-semibold mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                          <div className="col-span-6">
                            <label
                              htmlFor="balance"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Balance 💰
                            </label>
                            <input
                              placeholder="e.g. 5 500.20"
                              value={balance}
                              onChange={(e) =>
                                e.target.value.length < 25 &&
                                setBalance(e.target.value)
                              }
                              type="number"
                              name="balance"
                              id="balance"
                              className="font-semibold mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                          <div className="col-span-6">
                            <label
                              htmlFor="expiry"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Expiry
                            </label>
                            <div className="col-span-6 flex">
                              <input
                                placeholder="MM"
                                value={expiry.MM}
                                onChange={(e) => {
                                  if (
                                    e.target.value.length > 2 ||
                                    e.target.value < 0 ||
                                    e.target.value > 12
                                  )
                                    return;
                                  setExpiry({ ...expiry, MM: e.target.value });
                                }}
                                type="number"
                                min={0}
                                max={12}
                                maxLength={2}
                                name="expiry"
                                id="expiry"
                                className="mr-1 font-semibold mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              />
                              <input
                                placeholder="YY"
                                value={expiry.YY}
                                onChange={(e) => {
                                  if (e.target.value.length > 2) return;
                                  setExpiry({ ...expiry, YY: e.target.value });
                                }}
                                type="number"
                                min={currentYear}
                                max={60}
                                maxLength={2}
                                name="expiry"
                                id="expiry"
                                className="ml-1 font-semibold mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-5 py-5">
                      <CreditCard
                        name={cardHolder}
                        cardNumber={cardNumber}
                        expiry={expiry}
                        balance={balance}
                        currency={currency.value}
                      />
                    </div>
                  </div>
                  {error ? (
                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6 flex justify-between items-baseline">
                      <div
                        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative pr-20"
                        role="alert"
                      >
                        <strong className="font-bold">Holy smokes!</strong>{" "}
                        <span className="block sm:inline">
                          Something went Wrong.
                        </span>
                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                          <svg
                            onClick={toggleAlert}
                            className="fill-current h-6 w-6 text-red-500"
                            role="button"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <title>Close</title>
                            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                          </svg>
                        </span>
                      </div>
                      <button
                        onClick={handelSubmit}
                        className="justify-center
                      h-10
                      rounded-md border 
                      border-transparent 
                      bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                      <button
                        onClick={handelSubmit}
                        className="justify-center
                      h-10
                      rounded-md border 
                      border-transparent 
                      bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Save
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
