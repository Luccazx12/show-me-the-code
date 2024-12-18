import React from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';

import Link from 'next/link';
import { withRouter } from 'next/router';

// next.config - Configs
import config from '@config/config';
// Array para rotas da nav,
// com label e path (exibição e caminho)
import buttons from '@config/buttons';

// Contexts
import { AuthContext } from '@contexts/AuthContext';

// Components
import Img from './Image';

// services
import { userServices } from '@services/index';

const server = config.serverURL;

const NavBar = () => {
  const { user } = React.useContext(AuthContext);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  function logout() {
    userServices.logout();
  }

  return (
    <Disclosure as="nav" className="bg-gray-800 top-0 absolute z-50 w-full">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-8 w-8"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {buttons.navButtons.map((item, itemIdx) =>
                      itemIdx === 0 ? (
                        <React.Fragment key={item.path}>
                          {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                          <Link href={item.path}>
                            <div className="cursor-pointer bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
                              <span>{item.label}</span>
                            </div>
                          </Link>
                        </React.Fragment>
                      ) : (
                        <Link href={item.path} key={item.path}>
                          <div className="cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                            <span>{item.label}</span>
                          </div>
                        </Link>
                      ),
                    )}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <h1 className="text-1x1 text-xs font-bold text-white-800">
                    {user?.username.toUpperCase()}
                  </h1>

                  <button
                    type="button"
                    className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <Img
                              className="h-11 w-11 rounded-full"
                              src={`${server}${user?.avatar_url}`}
                              alt="Avatar do usuário"
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          show={open}
                          as={React.Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            {buttons.menuButtons.map(item => (
                              <Menu.Item key={item.path}>
                                {({ active }) => (
                                  <Link href={item.path}>
                                    <div
                                      className={classNames(
                                        active ? 'bg-gray-100' : '',
                                        'cursor-pointer block px-4 py-2 text-sm text-gray-700',
                                      )}
                                    >
                                      <span>{item.label}</span>
                                    </div>
                                  </Link>
                                )}
                              </Menu.Item>
                            ))}
                            <Menu.Item>
                              <a
                                href="#"
                                onClick={() => logout()}
                                className="block px-4 py-2 text-sm text-gray-700"
                              >
                                Sair
                              </a>
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {buttons.navButtons.map((item, itemIdx) =>
                itemIdx === 0 ? (
                  <React.Fragment key={item.path}>
                    {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                    <Link href={item.path} key={item.path}>
                      <div className="cursor-pointer bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">
                        <span>{item.label}</span>
                      </div>
                    </Link>
                  </React.Fragment>
                ) : (
                  <Link href={item.path} key={item.path}>
                    <div className="cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                      <span>{item.label}</span>
                    </div>
                  </Link>
                ),
              )}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={`${server}${user?.avatar_url}`}
                    alt="Avatar do usuário"
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">
                    {user?.username}
                  </div>
                  <div className="text-sm font-medium leading-none text-gray-400">
                    {user?.email}
                  </div>
                </div>
                <button
                  type="button"
                  className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 px-2 space-y-1">
                {buttons.menuButtons.map(item => (
                  <Link href={item.path} key={item.path}>
                    <div className="cursor-pointer block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">
                      <span>{item.label}</span>
                    </div>
                  </Link>
                ))}
                <a
                  href="#"
                  onClick={() => logout()}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                >
                  Sign out
                </a>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default withRouter(NavBar);
