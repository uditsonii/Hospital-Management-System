import React from "react";
import Navbar from "../components/navbar";

function OPDRegistration() {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      <div className="container">
        <div className="row">
            <div className="flex flex-row">
          <div className="col ">
              <div className="basis-5/12">
                <form>
                  <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                      <label
                        for="first_name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        First name
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div>
                      <label
                        for="last_name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Last name
                      </label>
                      <input
                        type="text"
                        id="last_name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Doe"
                        required
                      />
                    </div>
                    <div>
                      <label
                        for="company"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Flowbite"
                        required
                      />
                    </div>
                    <div>
                      <label
                        for="phone"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Phone number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="123-45-678"
                        pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                        required
                      />
                    </div>
                    <div>
                      <label
                        for="website"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Website URL
                      </label>
                      <input
                        type="url"
                        id="website"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="flowbite.com"
                        required
                      />
                    </div>
                    <div>
                      <label
                        for="visitors"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Unique visitors (per month)
                      </label>
                      <input
                        type="number"
                        id="visitors"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                        required
                      />
                    </div>
                  </div>
                  <div class="mb-6">
                    <label
                      for="email"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="john.doe@company.com"
                      required
                    />
                  </div>
                  <div class="mb-6">
                    <label
                      for="password"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="•••••••••"
                      required
                    />
                  </div>
                  <div class="mb-6">
                    <label
                      for="confirm_password"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Confirm password
                    </label>
                    <input
                      type="password"
                      id="confirm_password"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="•••••••••"
                      required
                    />
                  </div>
                  <div class="flex items-start mb-6">
                    <div class="flex items-center h-5">
                      <input
                        id="remember"
                        type="checkbox"
                        value=""
                        class="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                        required
                      />
                    </div>
                    <label
                      for="remember"
                      class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      I agree with the{" "}
                      <a
                        href="#"
                        class="text-blue-600 hover:underline dark:text-blue-500"
                      >
                        terms and conditions
                      </a>
                      .
                    </label>
                  </div>
                  <button
                    type="submit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Submit
                  </button>
                </form>

                <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6 text-center">
                  <h2 className="text-teal-400 text-xl font-semibold mb-4">
                    OPDRegistration
                  </h2>
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Patient's full name"
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <input
                    type="radio"
                    name="gender"
                    placeholder="Enter Patient's full name"
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Age / DOB
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Patient's full name"
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Contact
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Patient's full name"
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Patient's full name"
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Nationality
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Patient's full name"
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Blood Group
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Patient's full name"
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Marital Status
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Patient's full name"
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div className="bg-gray-800 p-2 pl-8 rounded-lg shadow-lg mb-3">
                  <h2 className="text-teal-400 text-xl font-semibold mb-2">
                    Visit Details
                  </h2>
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Department
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Patient's full name"
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Consulting Doctor
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Patient's full name"
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div className="bg-gray-800 p-2 pl-8 rounded-lg shadow-lg mb-3">
                  <h2 className="text-teal-400 text-xl font-semibold mb-2">
                    Payment Details
                  </h2>
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Registration Fee
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Patient's full name"
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Payment Mode
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Patient's full name"
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div className="bg-gray-800 p-2 pl-8 rounded-lg shadow-lg mb-3">
                  <h2 className="text-teal-400 text-xl font-semibold mb-2">
                    Emergency / Insurance
                  </h2>
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Emergency
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Patient's full name"
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Insurance
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Patient's full name"
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Policy Number
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Patient's full name"
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div className="bg-gray-800 p-2 pl-8 rounded-lg shadow-lg mb-3">
                  <h2 className="text-teal-400 text-xl font-semibold mb-2">
                    Admin Info
                  </h2>
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Registration By
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Patient's full name"
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Show time
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Patient's full name"
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
            </div>
            <div className="col">
              <div className="basis-1/3">
                <div class="my-3 py-8 px-8 max-w-sm mx-auto space-y-2 	bg-gray-800 rounded-xl shadow-lg sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:gap-x-6 shadow-md">
                  <img
                    class="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0"
                    src="/img/erin-lindford.jpg"
                    alt="Woman's Face"
                  />
                  <div class="text-center space-y-2 sm:text-left">
                    <div class="space-y-0.5">
                      <p class="text-lg text-black font-semibold">
                        Erin Lindford
                      </p>
                      <p class="text-slate-500 font-medium">Product Engineer</p>
                    </div>
                    {/* <button class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">Message</button> */}
                  </div>
                </div>
                <div class="my-3 py-8 px-8 max-w-sm mx-auto space-y-2 	bg-gray-800 rounded-xl shadow-lg sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:gap-x-6 shadow-md">
                  <img
                    class="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0"
                    src="/img/erin-lindford.jpg"
                    alt="Woman's Face"
                  />
                  <div class="text-center space-y-2 sm:text-left">
                    <div class="space-y-0.5">
                      <p class="text-lg text-black font-semibold">
                        Erin Lindford
                      </p>
                      <p class="text-slate-500 font-medium">Product Engineer</p>
                    </div>
                    {/* <button class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">Message</button> */}
                  </div>
                </div>
                <div class="my-3 py-8 px-8 max-w-sm mx-auto space-y-2 	bg-gray-800 rounded-xl shadow-lg sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:gap-x-6 shadow-md">
                  <img
                    class="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0"
                    src="/img/erin-lindford.jpg"
                    alt="Woman's Face"
                  />
                  <div class="text-center space-y-2 sm:text-left">
                    <div class="space-y-0.5">
                      <p class="text-lg text-black font-semibold">
                        Erin Lindford
                      </p>
                      <p class="text-slate-500 font-medium">Product Engineer</p>
                    </div>
                    {/* <button class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">Message</button> */}
                  </div>
                </div>
                <div class="my-3 py-8 px-8 max-w-sm mx-auto space-y-2 	bg-gray-800 rounded-xl shadow-lg sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:gap-x-6 shadow-md">
                  <img
                    class="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0"
                    src="/img/erin-lindford.jpg"
                    alt="Woman's Face"
                  />
                  <div class="text-center space-y-2 sm:text-left">
                    <div class="space-y-0.5">
                      <p class="text-lg text-black font-semibold">
                        Erin Lindford
                      </p>
                      <p class="text-slate-500 font-medium">Product Engineer</p>
                    </div>
                    {/* <button class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">Message</button> */}
                  </div>
                </div>
                <div class="my-3 py-8 px-8 max-w-sm mx-auto space-y-2 	bg-gray-800 rounded-xl shadow-lg sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:gap-x-6 shadow-md">
                  <img
                    class="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0"
                    src="/img/erin-lindford.jpg"
                    alt="Woman's Face"
                  />
                  <div class="text-center space-y-2 sm:text-left">
                    <div class="space-y-0.5">
                      <p class="text-lg text-black font-semibold">
                        Erin Lindford
                      </p>
                      <p class="text-slate-500 font-medium">Product Engineer</p>
                    </div>
                    {/* <button class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">Message</button> */}
                  </div>
                </div>
                <div class="my-3 py-8 px-8 max-w-sm mx-auto space-y-2 	bg-gray-800 rounded-xl shadow-lg sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:gap-x-6 shadow-md">
                  <img
                    class="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0"
                    src="/img/erin-lindford.jpg"
                    alt="Woman's Face"
                  />
                  <div class="text-center space-y-2 sm:text-left">
                    <div class="space-y-0.5">
                      <p class="text-lg text-black font-semibold">
                        Erin Lindford
                      </p>
                      <p class="text-slate-500 font-medium">Product Engineer</p>
                    </div>
                    {/* <button class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">Message</button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OPDRegistration;
