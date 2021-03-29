import { useReducer, createContext, useContext, useEffect } from "react";

export const StockListContext = createContext();

const stockListReducer = (state, action) => {
  switch (action.type) {
    case "SET_LIST": {
      return { ...state, stocklist: action.payload, selectedStocks: [], fetching: false };
    }
    case "SET_SELECTED": {
      let newSelectedArr;
      if (state.selectedStocks.length === 3) {
        newSelectedArr = state.selectedStocks.slice(1); // Remove the first
      } else {
        newSelectedArr = [...state.selectedStocks];
      }
      newSelectedArr.push(action.payload);
      return { ...state, selectedStocks: newSelectedArr };
    }
    case "REMOVE_SELECTED": {
      const newSelectedArr = [...state.selectedStocks];
      newSelectedArr.splice(action.index, 1);
      return { ...state, selectedStocks: newSelectedArr };
    }
    case "SELECTED_STOCK_NO_DATA": {
      const newSelectedArr = [...state.selectedStocks];
      const stockWithErr = { ...state.selectedStocks[action.payload.index], error: true };
      newSelectedArr.splice(action.payload.index, 1, stockWithErr);
      return { ...state, selectedStocks: newSelectedArr };
    }
    case "ERROR":
      return { ...state, error: true, fetching: false };
    case "FETCH":
      return { ...state, error: false, fetching: true };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};
const StockListProvider = ({ children }) => {
  const [state, dispatch] = useReducer(stockListReducer, { stocklist: [], selectedStocks: [], error: false, fetching: true });

  // Handle fetching data here
  useEffect(() => {
    if (!state.fetching) return;
    const fetchList = async () =>
      fetch("/stock/list")
        .then((r) => r.json())
        .then((result) => dispatch({ type: "SET_LIST", payload: result }))
        .catch(() => dispatch({ type: "ERROR" }));

    fetchList();
  }, [state.fetching]);

  const value = { state, dispatch };
  return <StockListContext.Provider value={value}>{children}</StockListContext.Provider>;
};

const useStockList = () => {
  const context = useContext(StockListContext);
  if (context === undefined) {
    throw new Error("useStockList must be used within a StockListProvider");
  }
  return context;
};

export { StockListProvider, useStockList };
