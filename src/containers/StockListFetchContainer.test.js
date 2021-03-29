import { render, fireEvent, waitFor } from "@testing-library/react";
import StockListFetchContainer from "./StockListFetchContainer";

import { StockListProvider } from "../contexts/stock-list-context";

beforeEach(() => {
  fetch.resetMocks();
});

test("renders retry button when fetching fails", async () => {
  fetch.mockReject(() => Promise.reject("API is down"));

  const { getByTestId, findByRole } = render(
    <StockListProvider>
      <StockListFetchContainer children={<div>WOO</div>} />
    </StockListProvider>
  );
  const loader = getByTestId("list-loader");
  expect(loader).toBeInTheDocument();

  const retryButton = await findByRole("button");
  await waitFor(() => expect(retryButton).toBeInTheDocument());
  expect(retryButton).toHaveTextContent("Retry");
});

test("renders children when fetching is successful", async () => {
  fetch.mockResponseOnce(JSON.stringify([]));

  const { getByTestId, findByText } = render(
    <StockListProvider>
      <StockListFetchContainer children={<div>WORKED</div>} />
    </StockListProvider>
  );
  const loader = getByTestId("list-loader");
  expect(loader).toBeInTheDocument();

  const children = await findByText("WORKED");
  expect(children).toBeInTheDocument();
});

// INTEGRATION TESTS

test("When a user see's an error and retries we fetch again", async () => {
  fetch.mockReject(() => Promise.reject("API is down"));

  const { getByTestId, findByRole, findByTestId } = render(
    <StockListProvider>
      <StockListFetchContainer children={<div>WOO</div>} />
    </StockListProvider>
  );
  const loader = getByTestId("list-loader");
  expect(loader).toBeInTheDocument();

  const retryButton = await findByRole("button");
  expect(retryButton).toBeInTheDocument();
  expect(retryButton).toHaveTextContent("Retry");
  // click retry
  fireEvent.click(retryButton);
  // Wait for spinner
  const secondLoader = await findByTestId("list-loader");
  expect(secondLoader).toBeInTheDocument();
});

test("When a user see's an error and retries we fetch again and display children", async () => {
  fetch.mockRejectOnce(new Error("API error")).mockResponseOnce(JSON.stringify([]));

  const { getByTestId, findByRole, findByText, findByTestId } = render(
    <StockListProvider>
      <StockListFetchContainer children={<div>WORKED</div>} />
    </StockListProvider>
  );
  const loader = getByTestId("list-loader");
  expect(loader).toBeInTheDocument();

  const retryButton = await findByRole("button");
  expect(retryButton).toBeInTheDocument();
  expect(retryButton).toHaveTextContent("Retry");
  // click retry
  fireEvent.click(retryButton);
  // Wait for spinner
  const secondLoader = await findByTestId("list-loader");
  expect(secondLoader).toBeInTheDocument();
  // Check children are displayed
  const children = await findByText("WORKED");
  expect(children).toBeInTheDocument();
});
