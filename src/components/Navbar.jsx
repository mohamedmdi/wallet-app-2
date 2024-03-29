import React from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { changeLogInStatus, setUser } from "../config/Slices/mainSlice";
import wallet from "../images/wallet-logo.png";
import MenuItems from "../utils/MenuItems";
import { Link, useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import useAuth from "../hooks/useAuth";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Navbar({ logIn, logOut }) {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  return (
    <div>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-center sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <img
                      className="block h-9 w-auto lg:hidden"
                      src={wallet}
                      alt="Wallet"
                    />
                    <img
                      className="hidden h-9 w-auto lg:block first-letter select-none"
                      src={wallet}
                      alt="Wallet"
                    />
                    <div className="text-white font-mono ml-4 text-lg select-none">
                      Wallet
                    </div>
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-1 ml-8">
                      <h3 className="text-white text-lg font-thin">
                        Welcome Back,{" "}
                      </h3>
                      <h3 className="font-semibold inline text-white text-lg ">
                        {user.name}
                      </h3>
                      {/* {MenuItems.map((item, k) => (
                        // <a
                        //   key={item.name}
                        //   href={item.path}
                        //   className={classNames(
                        //     item.current
                        //       ? "bg-gray-900 text-white"
                        //       : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        //     "px-3 py-2 rounded-md text-sm font-medium"
                        //   )}
                        //   aria-current={item.current ? "page" : undefined}
                        // >
                        //   {item.name}
                        // </a>
                        <CustomLink i={item} key={k} />
                      ))} */}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* <button
                    type="button"
                    className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button> */}

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex items-center justify-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        <span className="text-white m-2 font-semibold">
                          {user.name}
                        </span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to={"/Profile"}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => {
                                logOut();
                                navigate("/");
                                dispatch(
                                  setUser({
                                    user: {
                                      name: null,
                                      email: null,
                                      currency: { value: null },
                                      cardHolder: null,
                                      cardNumber: null,
                                      balance: null,
                                      expiry: { MM: null, YY: null },
                                    },
                                  })
                                );
                              }}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "px-4 py-2 text-sm text-gray-700 cursor-pointer w-full flex "
                              )}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {MenuItems.map((item, k) => (
                  <Disclosure.Button
                    key={k}
                    as="a"
                    aria-current={item.current ? "page" : undefined}
                  >
                    <CustomLink i={item} key={k} />
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
function CustomLink({ i }) {
  const resolvedLink = useResolvedPath(i.path);
  const isActiv = useMatch({ path: resolvedLink.pathname, end: true });

  return (
    <Link to={i.path}>
      <div
        className={classNames(
          isActiv
            ? "bg-gray-700 text-white"
            : "text-gray-300 hover:bg-gray-700 hover:text-white",
          "flex items-center px-3 py-2 m-1 first-letter:text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
        )}
      >
        <div className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
          {i.icon}
        </div>
        <div className="flex-1 ml-3 whitespace-nowrap">{i.name}</div>
      </div>
    </Link>
  );
}
