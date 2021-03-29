import { useEffect, useState } from "react";

import { TimeSeriesChart, Button, DatePicker } from "../components";
import { useStockList } from "../contexts/stock-list-context";
import useFetchStockCandles from "../hooks/use-fetch-stock-candles";

const toUnix = (val) => Math.round(val / 1000);
const oneYearAgoUnix = toUnix(new Date(new Date().setFullYear(new Date().getFullYear() - 1)).valueOf());
const nowUnix = toUnix(Date.now());
const resolutions = ["1", "5", "15", "30", "D", "W", "M"];
const priceTypeMap = {
  open: "o",
  close: "c",
  high: "h",
  low: "l",
};
const priceTypes = Object.keys(priceTypeMap);

const TimeSeriesContainer = () => {
  const [resolution, setResolution] = useState(resolutions[0]);
  const [priceType, setPriceType] = useState("open");
  const [dateRange, setDateRange] = useState({
    from: oneYearAgoUnix,
    to: nowUnix,
  }); // API only takes max one year ago
  const [series, setSeries] = useState([]);

  const {
    state: { selectedStocks },
  } = useStockList();
  const { results } = useFetchStockCandles({
    selectedStocks,
    dateRange,
    resolution,
  });

  useEffect(() => {
    setSeries(
      results.map((res) =>
        res.s === "ok"
          ? {
              name: res.symbol,
              data: res.t.map((date, index) => ({
                x: date * 1000,
                y: res[priceTypeMap[priceType]][index],
              })),
            }
          : { name: res.symbol, data: [{ x: "", y: 0 }] }
      )
    );
  }, [priceType, results]);

  const handleResolution = (ev) => setResolution(ev.target.value);
  const handlePriceType = (ev) => setPriceType(ev.target.value);
  const handleDateChange = (key) => (date) =>
    setDateRange((prev) => ({
      ...prev,
      [key]: toUnix(new Date(date).getTime()),
    }));
  const handleDateFromChange = handleDateChange("from");
  const handleDateToChange = handleDateChange("to");

  return selectedStocks.length === 0 ? (
    <div data-testid="timeseries-disabled" className="flex flex-col w-3/5 font-bold mr-auto ml-auto text-4xl">
      No data to display <span className="text-base font-normal pt-4 pl-2 grey-100">Try searching for a stock using the search box above</span>
    </div>
  ) : (
    <div data-testid="timeseries-enabled" className="w-4/5 ml-auto h-1/6 mr-auto">
      <div className="flex flex-row justify-between">
        <div>
          resolution:
          {resolutions.map((num) => (
            <Button
              dataTestId={`timeseries-resolution-bttn-${num}-${resolution === num}`}
              bgColour={resolution === num ? "gray-400" : "gray-200"}
              text="sm"
              small
              hoverBgColour="gray-300"
              value={num}
              key={num}
              onClick={handleResolution}
            >
              {num}
            </Button>
          ))}
        </div>
        <div>
          Price Type:
          {priceTypes.map((price) => (
            <Button
              dataTestId={`timeseries-price-bttn-${price}-${priceType === price}`}
              bgColour={priceType === price ? "gray-400" : "gray-200"}
              text="sm"
              small
              hoverBgColour="gray-300"
              value={price}
              key={price}
              onClick={handlePriceType}
            >
              {price}
            </Button>
          ))}
        </div>
        <div className="float-right">
          <DatePicker handleChange={handleDateFromChange} value={new Date(dateRange.from * 1000)} />
          {"-"}
          <DatePicker handleChange={handleDateToChange} value={new Date(dateRange.to * 1000)} />
        </div>
      </div>
      <TimeSeriesChart series={series} priceType={priceType} />
    </div>
  );
};

export default TimeSeriesContainer;
