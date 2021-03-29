export const SearchBar = ({ handleChange, value, handleBlur, handleFocus }) => (
  <div className="bg-white rounded-lg flex mt-4  items-center p-3 shadow-sm border border-gray-200" onBlur={handleBlur} onFocus={handleFocus}>
    <svg className=" w-5 text-gray-600 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
    </svg>
    <input
      type="search"
      role="search"
      placeholder="Search US funds (e.g. Apple, AAPL)"
      className="w-full pl-4 text-sm outline-none focus:outline-none bg-transparent"
      onChange={handleChange}
      value={value}
    />
  </div>
);
