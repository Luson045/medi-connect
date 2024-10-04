export function Cards({ Title, Details }) {
  return (
    <div
      className="flex flex-col p-5 h-auto w-[auto] sm:w-[75%]  lg:w-[22rem] border-2 bg-slate-300 border-gray-300 hover:cursor-pointer shadow-md rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl m-4"
      data-aos="flip-up"
    >
      <h1 className="font-bold text-[18px] sm:text-[20px] lg:text-[22px] text-violet-700 flex justify-center mb-3">
        {Title}
      </h1>
      <p className="p-2 text-[16px] sm:text-[18px] lg:text-[18px] text-gray-700 leading-relaxed">
        {Details}
      </p>
    </div>
  );
}
