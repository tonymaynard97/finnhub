import StockListFetchContainer from "./StockListFetchContainer";
import FundSearcher from "./FundSearcher";
import SelectedFundsPills from "./SelectedFundsPills";
import TimeSeriesContainer from "./TimeSeriesContainer";

import { Header } from "../components";
import { StockListProvider } from "../contexts/stock-list-context";

function App() {
  return (
    <div>
      <StockListProvider>
        <Header />
        <StockListFetchContainer>
          <SelectedFundsPills />
          <FundSearcher />
          <TimeSeriesContainer />
        </StockListFetchContainer>
      </StockListProvider>
    </div>
  );
}

export default App;
