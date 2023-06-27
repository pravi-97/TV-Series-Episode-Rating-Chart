import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { UserData } from './Data'
import LineChart from './components/LineChart';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SearchBar from './Searchbar';
import UpArrow from './UpArrow';
import FindSeries from './FindSeries';

function App() {

  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [{
      lable: "Users Gained",
      data: UserData.map((data) => data.userGain),
    }]
  })

  return (
    <div className="App">
      <Router>
        <div className="App">
          <SearchBar />
          <div className="content">
            <Switch>
              <Route exact path="/chart">
                <div style={{ width: 700 }}>
                  <LineChart chartData={userData} />
                </div>
              </Route>
              <Route exact path="/find">
                <FindSeries />
              </Route>
            </Switch>
          </div>
          <UpArrow/>
        </div>
      </Router>
    </div>
  );
}

export default App;
