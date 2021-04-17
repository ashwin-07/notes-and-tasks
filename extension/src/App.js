import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Tasks from './components/Tasks';
import Notes from './components/Notes';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul className="navBar">
              <li className="navBarItem">
                <Link to="/">Home</Link>
              </li>
              <li className="navBarItem">
                <Link to="/tasks">tasks</Link>
              </li>
              <li className="navBarItem">
                <Link to="/notes">notes</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/tasks">
              <Tasks />
            </Route>
            <Route path="/notes">
              <Notes />
            </Route>
            <Route path="/">
              <Tasks />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};


export default App;
