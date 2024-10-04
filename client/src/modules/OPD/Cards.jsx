export function Cards({ Title, Details, Image }) {
  return (
    // <!-- Card -->
    <div className="p-4 md:w-1/3 ">
      <div className="h-full rounded-xl shadow-cla-blue bg-gradient-to-r from-indigo-50 to-blue-50 overflow-hidden hover:cursor-pointer shadow-md rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
        {/* <!-- Image --> */}
        <img className="lg:h-2/3 md:h-36 w-full object-cover transition-all duration-400 mt-0 " src={Image} alt="Course 01" />
        {/* <!-- Card Content --> */}
        <div className="flex flex-col p-6 bottom-0 top-0">
          {/* <!-- Card body --> */}
          <div className="flex-1">
            
              <h2 className="title-font text-lg font-medium text-gray-600 mb-3">
                <a
                  className="text-slate-900 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300"
                  href="#0"
                >
                  {Title}
                </a>
              </h2>
            {/* <!-- Content --> */}
            <div className="flex text-sm text-slate-600 mb-8 ">
              <p>{Details}</p>
            </div>
          </div>
          {/* <!-- Card footer --> */}
          <div className="flex justify-end space-x-2">
            <a
              className="inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors"
              href="#0"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
{
  /* // <div className="flex flex-col w-1/3 p-4 h-full w-full sm:w-[75%]  lg:w-[22rem] border-2 bg-slate-300 border-gray-300 hover:cursor-pointer shadow-md rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl m-4">
    //   <h1 className="font-bold text-[18px] sm:text-[20px] lg:text-[22px] text-black-700 flex justify-center mb-3">
    //     {Title}
    //   </h1>
    //   <p className=" flex-1 p-2 text-[16px] sm:text-[18px] lg:text-[18px] text-gray-700 leading-relaxed">
    //     {Details}
    //   </p>
    // </div> */
}
