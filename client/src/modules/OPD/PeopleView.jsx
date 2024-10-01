export function PeopleCard({ Title, Details }) {
  return (
    <div className="flex flex-col p-5 h-auto w-[200px] sm:w-[75%] md:w-[60%] lg:w-[45%] xl:w-[30%] 2xl:w-[22rem] border-2 border-gray-300 hover:cursor-pointer shadow-md rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl m-4">
      <h1 className="font-bold text-[18px] sm:text-[20px] lg:text-[22px] xl:text-[24px] text-violet-700 flex justify-center mb-3">
        {Title}
      </h1>
      <p className="p-2 text-[16px] sm:text-[18px] lg:text-[18px] xl:text-[20px] leading-relaxed text-center">
        {Details}
      </p>
    </div>
  );
}
