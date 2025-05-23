import React, { useState } from 'react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  return (
    <>
   
 {/* <nav className="bg-teal-800 text-white">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button 
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="block h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Logo and nav 
          <div className="flex flex-1 items-center justify-center sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="https://tailwindcss.com/_next/static/media/mark.1b3e5841.svg"
                alt="Logo"
              />
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              <a href="#" className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
            </div>
          </div>

          {/* Profile section 
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:pr-0">
            {/* Profile dropdown 
            <div className="relative ml-3">
              <div>
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                >
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://i.pravatar.cc/300"
                    alt="User"
                  />
                </button>
              </div>

              {/* Dropdown menu 
              {profileMenuOpen && (
                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white text-gray-800 shadow-lg ring-1 ring-black ring-opacity-5">
                  <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Your Profile</a>
                  <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Settings</a>
                  <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Sign out</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu 
      {mobileMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <a href="#" className="block bg-gray-900 text-white px-3 py-2 rounded-md text-base font-medium">Dashboard</a>
          </div>
        </div>
      )}
    </nav>
 */}

<nav class="bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
  <div class="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">

    {/* <!-- Logo --> */}
    <a href="#" class="flex items-center space-x-2 rtl:space-x-reverse">
      <span class="text-2xl font-semibold whitespace-nowrap dark:text-white">Logo</span>
    </a>

    {/* <!-- Search Bar (visible on md and up) --> */}
    <div class="hidden md:flex flex-1 justify-center px-4">
      <input
        type="text"
        placeholder="Search..."
        class="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
      />
    </div>

    {/* <!-- Right Side (search icon on small + profile dropdown) --> */}
    <div class="flex items-center space-x-4">

      {/* <!-- Search Icon (small screens only) --> */}
      <div class="md:hidden">
        <button class="p-2 rounded-full text-gray-500 hover:bg-transparent dark:text-gray-400 dark:hover:bg-transparent">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2"
            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z">
            </path>
          </svg>
        </button>
      </div>

      {/* <!-- Profile with dropdown on hover --> */}
      <div class="relative group">
        <button type="button"
          class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
          <span class="sr-only">Open user menu</span>
          <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="User photo" />
        </button>

        {/* <!-- Dropdown menu (shown on hover) --> */}
        <div class="absolute right-0 z-50 hidden group-hover:block mt-2 w-44 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600">
          <div class="px-4 py-3">
            <span class="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
            <span class="block text-sm text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
          </div>
          <ul class="py-2">
            <li><a href="#" class="block px-4 py-2 text-sm dark:text-gray-200">Dashboard</a></li>
            <li><a href="#" class="block px-4 py-2 text-sm dark:text-gray-200">Settings</a></li>
            <li><a href="#" class="block px-4 py-2 text-sm dark:text-gray-200">Earnings</a></li>
            <li><a href="#" class="block px-4 py-2 text-sm dark:text-gray-200">Sign out</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</nav>




</>
  );
};

export default Navbar;
