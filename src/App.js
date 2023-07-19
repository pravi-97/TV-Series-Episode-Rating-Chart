import LineChart from './components/LineChart';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SearchBar from './Searchbar';
import UpArrow from './UpArrow';
import FindSeries from './FindSeries';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="App">
          <SearchBar />
          <div className="content">
            <Switch>
              <Route exact path="/chart">
                <div>
                  <LineChart />
                </div>
              </Route>
              <Route exact path="/find">
                <FindSeries />
              </Route>
            </Switch>
          </div>
          <UpArrow />
        </div>
      </Router>
    </div>
  );
}

export default App;