import LineChart from './components/LineChart';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchBar from "./SearchBar";
import UpArrow from "./UpArrow";
import FindSeries from "./FindSeries";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SearchBar />
        <Routes>
          <Route path="/chart" element={<LineChart />} />
          <Route path="/find" element={<FindSeries />} />
          {/* <Route path="/*" element={<Error />} /> */}
        </Routes>
        <UpArrow />
      </BrowserRouter>
    </div>
  );
}

export default App;
