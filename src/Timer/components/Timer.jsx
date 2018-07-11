import React, { Component } from 'react';
import moment from 'moment';
import TimerDisplay from './TimerDisplay.jsx';
import TimerButton from './TimerButton.jsx';


// we need to the timing so we are going to refactor it to class component
class Timer extends Component {
  constructor() {
    super();
    this.state = { 
      currentTime: moment().hours(0).minutes(25).seconds(0),
      baseTime: moment().hours(0).minutes(0).seconds(0),
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    switch (event.target.getAttribute("id")) {
      case "hour": {
        this.setState({ currentTime: this.state.currentTime.hour(parseInt(event.target.value)) });
        break;
      }
      case "minute": {
        this.setState({ currentTime: this.state.currentTime.minute(parseInt(event.target.value)) });
        break;
      }
      case "second": {
        this.setState({ currentTime: this.state.currentTime.second(parseInt(event.target.value)) });
        break;
      }
    }
  }

  render() {
    const { currentTime, baseTime } = this.state;
    return (
      <div className="card app-content d-block mx-auto" >
        <div className="card-body">
          <div className="container-fluid">
            <div className="row">
              <h3 className="d-block mx-auto"> Pomodoro Technique !!!
                <img src="./img/clock.png" height="60" width="60" alt=""/>
              </h3>
            </div>
            <TimerButton currentTime={this.state.currentTime} />
            <div className="row control-row">
              <div className="form-group">
                <div className="col-md-9" >
                  <label htmlFor="hours"> Hours </label>
                </div>
                <div className="col-md-9">
                  <input id="hour" className="form-control" type="number" defaultValue={parseInt(currentTime.format('HH'))} onChange={this.handleChange} />
                </div>
              </div>
              <div className="form-group">
                <div className="col-md-9">
                  <label htmlFor="hours"> Minutes </label>
                </div>
                <div className="col-md-9">
                  <input id="minute" className="form-control" type="number" defaultValue={parseInt(currentTime.format('mm'))} onChange={this.handleChange} />
                </div>
              </div>
              <div className="form-group">
                <div className="col-md-9">
                  <label htmlFor="hours"> Seconds </label>
                </div>
                <div className="col-md-9">
                  <input id="second" className="form-control" type="number" defaultValue={parseInt(currentTime.format('ss'))} onChange={this.handleChange} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
export default Timer;
