import { fireEvent, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FundSearcher from "./FundSearcher";

import { StockListProvider } from "../contexts/stock-list-context";

beforeEach(() => {
  fetch.resetMocks();
});

test("renders seach input", async () => {
  fetch.mockResponse(
    JSON.stringify([
      { symbol: "AAPL", description: "BB" },
      { symbol: "CCPL", description: "AA" },
    ])
  );

  const { getByRole } = render(
    <StockListProvider>
      <FundSearcher />
    </StockListProvider>
  );

  const searchInput = getByRole("search");
  await waitFor(() => expect(searchInput).toBeInTheDocument());
});

test("renders results list", async () => {
  fetch.mockResponse(
    JSON.stringify([
      { symbol: "AAPL", description: "BB" },
      { symbol: "CCPL", description: "AA" },
    ])
  );

  const { findAllByRole, getByRole } = render(
    <StockListProvider>
      <FundSearcher />
    </StockListProvider>
  );

  await waitFor(() => {
    userEvent.click(getByRole("search"));
    userEvent.type(getByRole("search"), "AA");
    expect(getByRole("search").value).toBe("AA");
  });

  const results = await findAllByRole("listitem");
  expect(results.length).toBe(2);
});

test("Selecting a result is displayed to the user", async () => {
  fetch.mockResponse(JSON.stringify([{ symbol: "AAPL", description: "BB" }]));

  const { findByRole, getByRole, getByText, queryByText } = render(
    <StockListProvider>
      <FundSearcher />
    </StockListProvider>
  );
  await waitFor(() => {
    userEvent.click(getByRole("search"));
    userEvent.type(getByRole("search"), "AA");
    expect(getByRole("search").value).toBe("AA");
  });

  const result = await findByRole("listitem");
  // Check nothing selected
  let selectedPill = queryByText("Selected");
  expect(selectedPill).toBeNull();
  // click row
  await waitFor(() => userEvent.click(result));

  selectedPill = getByText("Selected");
  expect(selectedPill).toBeInTheDocument();
});

test("Selecting same result does nothing", async () => {
  fetch.mockResponse(JSON.stringify([{ symbol: "AAPL", description: "BB" }]));

  const { findByRole, getByRole, getAllByText, queryByText } = render(
    <StockListProvider>
      <FundSearcher />
    </StockListProvider>
  );
  await waitFor(() => {
    userEvent.click(getByRole("search"));
    userEvent.type(getByRole("search"), "AA");
    expect(getByRole("search").value).toBe("AA");
  });

  const result = await findByRole("listitem");
  // Check nothing selected
  let selectedPill = queryByText("Selected");
  expect(selectedPill).toBeNull();

  // click row multiple times
  await waitFor(() => {
    userEvent.click(result);
    userEvent.click(result);
    userEvent.click(result);
  });

  selectedPill = getAllByText("Selected");
  expect(selectedPill.length).toBe(1);
});

// INTEGRATION TEST

test("searching allows us to select upto 3 funds", async () => {
  fetch.mockResponse(
    JSON.stringify([
      { symbol: "AAPL", description: "BB" },
      { symbol: "CCPL", description: "AA" }, // Search term in description
      { symbol: "PLAA", description: "AA" },
      { symbol: "AAA", description: "CC" },
    ])
  );

  const { findAllByRole, getByRole, getAllByText } = render(
    <StockListProvider>
      <FundSearcher />
    </StockListProvider>
  );
  await waitFor(() => {
    userEvent.click(getByRole("search"));
    userEvent.type(getByRole("search"), "AA");
    expect(getByRole("search").value).toBe("AA");
  });

  const result = await findAllByRole("listitem");
  expect(result.length).toBe(4);

  // click 4 rows
  await waitFor(() => {
    userEvent.click(result[0]);
    userEvent.click(result[1]);
    userEvent.click(result[2]);
    userEvent.click(result[3]);
  });

  const selectedPills = getAllByText("Selected");
  expect(selectedPills.length).toBe(3);
});

test("searching multiple stocks does not lose our selected funds", async () => {
  fetch.mockResponse(
    JSON.stringify([
      { symbol: "AAPL", displaySymbol: "AAPL", description: "BB--" },
      { symbol: "CCPL", displaySymbol: "CCPL", description: "AA--" }, // Search term in description
      { symbol: "XLP", displaySymbol: "XLP", description: "--" },
      { symbol: "DEF", displaySymbol: "DEF", description: "XLP exchange--" },
    ])
  );

  const { findAllByRole, getByRole, getAllByText, findAllByText } = render(
    <StockListProvider>
      <FundSearcher />
    </StockListProvider>
  );
  await waitFor(() => {
    userEvent.click(getByRole("search"));
    userEvent.type(getByRole("search"), "AA");
    expect(getByRole("search").value).toBe("AA");
  });

  let result = await findAllByRole("listitem");
  expect(result.length).toBe(2);

  // click 2 rows
  await waitFor(() => {
    userEvent.click(result[0]);
    userEvent.click(result[1]);
  });

  let selectedPills = getAllByText("Selected");
  expect(selectedPills.length).toBe(2);

  // Search again
  await waitFor(() => {
    fireEvent.input(getByRole("search"), { target: { value: "XLP" } });
  });
  result = await findAllByText("XLP");
  expect(result.length).toBe(1);

  // Click new searched stock
  await waitFor(() => {
    userEvent.click(result[0]);

    // Get All results
    fireEvent.input(getByRole("search"), { target: { value: "--" } });
  });
  result = await findAllByText("AAPL");

  selectedPills = getAllByText("Selected");
  expect(selectedPills.length).toBe(3);
});
