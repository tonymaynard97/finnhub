export const Pill = ({ text, onClick, error }) => (
  <div className={`flex justify-center items-center m-1 font-medium py-1 px-2 ${error ? "bg-red" : "bg-gray-200"} rounded-full text-teal-700 bg-teal-100 border border-teal-300`}>
    <div className="text-xs font-normal float-right">{text}</div>
    {onClick && (
      <button onClick={onClick}>
        <svg className="h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    )}
  </div>
);
