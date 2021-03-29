import { useStockList } from "../contexts/stock-list-context";
import { Pill } from "../components";

const SelectedFundsPills = () => {
  const {
    state: { selectedStocks },
    dispatch,
  } = useStockList();

  const handleRemove = (index) => dispatch({ type: "REMOVE_SELECTED", index });
  return (
    <div className="flex w-3/5 mr-auto ml-auto mt-16">
      <span className="self-center text-center font-semibold">Select upto 3 stocks:</span>
      {selectedStocks && selectedStocks.map((stock, indx) => <Pill text={stock.symbol} key={stock.symbol} error={stock.error} onClick={() => handleRemove(indx)} />)}
    </div>
  );
};

export default SelectedFundsPills;
