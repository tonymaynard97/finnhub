const { useEffect, useState } = require("react");

const useFetchStockCandles = ({ selectedStocks, resolution, dateRange }) => {
  const [results, setResults] = useState([]);
  useEffect(() => {
    let staleResponse = false;
    if (selectedStocks) {
      const fetchCandles = () =>
        Promise.all(
          selectedStocks.map(async (stock) => {
            const stockResponse = await fetch(`/stock/candle?symbol=${stock.symbol}&resolution=${resolution}&from=${dateRange.from}&to=${dateRange.to}`);

            return stockResponse.json();
          })
        ).then((resultsArray) => {
          const resultsWithSymbol = resultsArray.map((res, index) => ({ symbol: selectedStocks[index].symbol, ...res }));
          setResults(resultsWithSymbol);
        });

      if (!staleResponse) fetchCandles();
    }

    return () => {
      staleResponse = true;
    };
  }, [dateRange.from, dateRange.to, resolution, selectedStocks]);

  return { results };
};
export default useFetchStockCandles;
