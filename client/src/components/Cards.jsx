export function Cards({ Title, Details, Image }) {
  return (
    // <!-- Card -->
    <div className="p-4 md:w-1/3 ">
      <div className="h-full flex flex-col justify-between rounded-xl shadow-cla-blue bg-gradient-to-r from-indigo-50 to-blue-50 overflow-hidden hover:cursor-pointer shadow-md rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
        {/* <!-- Image --> */}
        <img
          className="lg:h-2/3 md:h-36 w-full object-cover transition-all duration-400 mt-0 "
          src={Image}
          alt="Course 01"
        />
        {/* <!-- Card Content --> */}
        {/* <div className="flex flex-col p-3 justify-end"> */}
        {/* <!-- Card body --> */}
        <div className="flex flex-col justify-between mb-4">
          <h2 className="title-font text-lg font-medium text-gray-600 mb-3">
            <a
              className="text-slate-900 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300"
              href="#0"
            >
              {Title}
            </a>
          </h2>
          <div className="flex flex-col justify-between px-4">
            {/* <!-- Content --> */}
            <div className="text-sm text-slate-600">
              <p>{Details}</p>
            </div>
            {/* <!-- Card footer --> */}
            <div className="flex justify-end space-x-2 ">
              <a
                className="inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors"
                href="#0"
              >
                Read More
              </a>
            </div>
          </div>
        </div>

        {/* </div> */}
      </div>
    </div>
  );
}
