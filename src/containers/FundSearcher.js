import { useEffect, useState, useRef } from "react";

import { SearchBar, SearchItem } from "../components";
import { useStockList } from "../contexts/stock-list-context";
import useDebounce from "../hooks/use-debounce";
import useHandleClickOutside from "../hooks/use-click-outside";

const searchFundList = (stockList, searchTerm) => stockList.filter((item) => item.symbol.toLowerCase().includes(searchTerm) || item.description.toLowerCase().includes(searchTerm));

const FundSearcher = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const wrapperRef = useRef(null);

  const { isFocused } = useHandleClickOutside(wrapperRef);

  const {
    state: { stocklist, selectedStocks },
    dispatch,
  } = useStockList();
  let debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm && debouncedSearchTerm.length > 1) {
      const results = searchFundList(stocklist, debouncedSearchTerm.toLowerCase());
      setResults(results);
    } else {
      setResults([]);
    }
  }, [debouncedSearchTerm, stocklist]);

  // Create key map so no need to loop when seeing if items selected
  const selectedSymbolMap = selectedStocks.reduce((acc, stock) => ((acc[stock.symbol] = 1), acc), {}); // eslint-disable-line no-sequences

  const handleChange = (ev) => setSearchTerm(ev.target.value);
  const selectItem = (item) => {
    if (!selectedSymbolMap[item.symbol]) dispatch({ type: "SET_SELECTED", payload: item });
  };

  return (
    <>
      <div className="w-3/5 mr-auto ml-auto mt-4 pb-12" ref={wrapperRef}>
        <SearchBar handleChange={handleChange} />
        {isFocused && (
          <ul className="max-h-56 absolute bg-white w-3/5 overflow-y-auto shadow-lg z-10">
            {results.length > 0 &&
              results.map((item) => {
                return <SearchItem role="listitem" item={item} key={item.symbol} onClick={() => selectItem(item)} selected={!!selectedSymbolMap[item.symbol]} />;
              })}
          </ul>
        )}
      </div>
    </>
  );
};

export default FundSearcher;
