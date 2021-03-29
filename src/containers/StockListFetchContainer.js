import { Button } from "../components";
import { useStockList } from "../contexts/stock-list-context";

const StockListFetchContainer = ({ children }) => {
  const {
    state: { error, fetching },
    dispatch,
  } = useStockList();

  const refetch = () => dispatch({ type: "FETCH" });

  if (fetching) {
    return (
      <div data-testid="list-loader" className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
        <div style={{ borderTopColor: "transparent" }} className="border-solid animate-spin  rounded-full border-blue-400 border-8 h-60 w-60"></div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex flex-col items-center">
        <span className="text-xl font-mono p-12 text-center">We're unable to fetch the stock list now, please try again. </span>
        <Button onClick={refetch}>Retry</Button>
      </div>
    );
  } else return <>{children}</>;
};

export default StockListFetchContainer;
