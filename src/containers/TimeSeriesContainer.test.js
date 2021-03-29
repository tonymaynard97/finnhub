import { render, waitFor } from "@testing-library/react";
import TimeSeriesContainer from "./TimeSeriesContainer";

import { StockListContext, StockListProvider } from "../contexts/stock-list-context";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  fetch.resetMocks();
});
jest.mock("react-apexcharts", () => {
  return {
    __esModule: true,
    default: (props) => {
      return <span data-testid="timeseries-chrt" {...props} />;
    },
  };
});

const customRender = (ui, { providerProps }) => {
  return render(<StockListContext.Provider value={{ state: { ...providerProps } }}>{ui}</StockListContext.Provider>);
};

test("renders no selected stock message", async () => {
  fetch.mockReject(() => Promise.reject("API is down"));

  const { findByTestId } = render(
    <StockListProvider>
      <TimeSeriesContainer />
    </StockListProvider>
  );

  const noDataMessage = await findByTestId("timeseries-disabled");
  await waitFor(() => {
    expect(noDataMessage).toBeInTheDocument();
    expect(noDataMessage).toHaveTextContent("No data to display Try searching for a stock using the search box above");
  });
});

test("renders time series graph wrapper", async () => {
  fetch.mockResponse(JSON.stringify([{ s: "ok", o: [], c: [], l: [], h: [] }]));

  const { findByTestId } = customRender(<TimeSeriesContainer />, { providerProps: { selectedStocks: [{ symbol: "AAPL", description: "BB" }] } });

  const apexChartWrapper = await findByTestId("timeseries-enabled");
  await waitFor(() => {
    expect(apexChartWrapper).toBeInTheDocument();
  });
});

test("renders time series graph resolution buttons", async () => {
  fetch.mockResponse(JSON.stringify([{ s: "ok", o: [], c: [], l: [], h: [] }]));

  const { findAllByTestId } = customRender(<TimeSeriesContainer />, { providerProps: { selectedStocks: [{ symbol: "AAPL", description: "BB" }] } });

  const resolution = await findAllByTestId("timeseries-resolution-bttn", { exact: false });
  await waitFor(() => {
    expect(resolution).not.toBeNull();
    expect(resolution.length).toBe(7);
  });
});

test("clicking resolution button changes res", async () => {
  fetch.mockResponse(JSON.stringify([{ s: "ok", o: [], c: [], l: [], h: [] }]));

  const { findAllByTestId, findByTestId } = customRender(<TimeSeriesContainer />, { providerProps: { selectedStocks: [{ symbol: "AAPL", description: "BB" }] } });

  const resolution = await findAllByTestId("timeseries-resolution-bttn", { exact: false });
  let active5Button = await findByTestId("timeseries-resolution-bttn-5-false");
  expect(active5Button).toBeInTheDocument();
  await waitFor(() => userEvent.click(resolution[1]));

  active5Button = await findByTestId("timeseries-resolution-bttn-5-true");
  expect(active5Button).toBeInTheDocument();
});

test("renders time series graph price type buttons", async () => {
  fetch.mockResponse(JSON.stringify([{ s: "ok", o: [], c: [], l: [], h: [] }]));

  const { findAllByTestId } = customRender(<TimeSeriesContainer />, { providerProps: { selectedStocks: [{ symbol: "AAPL", description: "BB" }] } });

  const resolution = await findAllByTestId("timeseries-price-bttn", { exact: false });
  await waitFor(() => {
    expect(resolution).not.toBeNull();
    expect(resolution.length).toBe(4);
  });
});

test("clicking price type button changes price", async () => {
  fetch.mockResponse(JSON.stringify([{ s: "ok", o: [], c: [], l: [], h: [] }]));

  const { findAllByTestId, findByTestId } = customRender(<TimeSeriesContainer />, { providerProps: { selectedStocks: [{ symbol: "AAPL", description: "BB" }] } });

  const prices = await findAllByTestId("timeseries-price-bttn", { exact: false });
  let activeCloseButton = await findByTestId("timeseries-price-bttn-close-false");
  expect(activeCloseButton).toBeInTheDocument();
  await waitFor(() => userEvent.click(prices[1]));

  activeCloseButton = await findByTestId("timeseries-price-bttn-close-true");
  expect(activeCloseButton).toBeInTheDocument();
});

test("renders time series graph", async () => {
  fetch.mockResponse(JSON.stringify([{ s: "ok", o: [], c: [], l: [], h: [] }]));

  const { findByTestId } = customRender(<TimeSeriesContainer />, { providerProps: { selectedStocks: [{ symbol: "AAPL", description: "BB" }] } });

  const mockChart = await findByTestId("timeseries-chrt");
  await waitFor(() => {
    expect(mockChart).toBeInTheDocument();
    expect(mockChart).toHaveAttribute("series");
    expect(mockChart).toHaveAttribute("options");
  });
});
