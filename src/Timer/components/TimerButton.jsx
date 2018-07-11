import React, { Component } from 'react';
import moment from 'moment';
import condition from 'promise-conditional';

class TimerButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentTime: moment().hours(0).minutes(25).seconds(0),
			title: "Work",
			cunter: 2
		};
	}

	start() {
		new Promise((resolve, reject) => {
			this.setState({ title: "Work" });
			this.setState({ currentTime: moment().hours(0).minutes(10).seconds(0) });
			var interval = setInterval(() => {
				this.setState({ currentTime: this.state.currentTime.subtract(1, "seconds") });
				if ((this.state.currentTime.isBefore(moment({ hour: 0, minute: 0, second: 1 })))) {
					clearInterval(interval);
					return resolve();
				}
			}, 5);
		}).then(() => {
			this.setState({ currentTime: moment().hours(0).minutes(5).seconds(0) });
			this.setState({ title: "Rest" });
			this.setState({ cunter: this.state.cunter - 1 });
			var restinterval = setInterval(() => {
				this.setState({ currentTime: this.state.currentTime.subtract(1, "seconds") });
				if ((this.state.currentTime.isBefore(moment({ hour: 0, minute: 0, second: 1 })))) {
					clearInterval(restinterval);
					if (this.state.cunter > 0)
						this.start();
					else if (this.state.cunter <= 0)
						this.wait();
				}
			}, 10);
		});
	}


	wait() {
		this.setState({ currentTime: moment().hours(0).minutes(30).seconds(0) });
		this.setState({ title: "Rest" });
		var lastInterval = setInterval(() => {
			this.setState({ currentTime: this.state.currentTime.subtract(1, "seconds") });
			if ((this.state.currentTime.isBefore(moment({ hour: 0, minute: 0, second: 1 }))))
				clearInterval(lastInterval);
		}, 10);
	}


	handleStart = () => {
		console.clear();
		this.start();
	}

	titleChange() {
		this.setState({ title: "Rest" });
	}

	render() {
		return (
			<div>
				<div>{this.state.title}</div>
				<div>{this.state.cunter}</div>
				<div className="row">
					<h1 className="d-block mx-auto">
						{this.state.currentTime.format("HH:mm:ss")}  </h1>
				</div>
				<div className="button">
					<button className="btn btn-danger d-block mx-auto" onClick={this.handleStart}>Start</button>
				</div>
			</div>
		);
	}
}
export default TimerButton;

