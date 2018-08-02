import React, { Component } from 'react';
import Timer from './Timer/components/Timer';
import Tasks from './Timer/components/Task.jsx';
import './App.css';

class App extends Component {
  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col">
            <Tasks />
          </div>
          <div class="col">
            <Timer />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
