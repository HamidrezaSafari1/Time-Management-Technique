import React, { Component } from 'react';
import moment from 'moment';
import buzz from 'buzz';

var mySound = new buzz.sound("./sound/alarm.ogg");
class TimerButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentTime: this.props.currentTime,
			state: "Work",
			image_src: "./img/work.png",
			cunter: 4
		};
	}

	start() {
		new Promise((resolve, reject) => {
			this.setState({ state: "Work" });
			this.setState({ image_src: "./img/work.png" });
			this.setState({ currentTime: moment().hours(0).minutes(25).seconds(0) });
			mySound.play();
			var interval = setInterval(() => {
				this.setState({ currentTime: this.state.currentTime.subtract(1, "seconds") });
				if ((this.state.currentTime.isBefore(moment({ hour: 0, minute: 0, second: 1 })))) {
					clearInterval(interval);
					return resolve();
				}
			}, 1000);
		}).then(() => {
			mySound.play();
			this.setState({ state: "Rest" });
			this.setState({ image_src: "./img/rest.png" });
			this.setState({ cunter: this.state.cunter - 1 });
			if (this.state.cunter <= 0) {
				this.setState({ currentTime: moment().hours(0).minutes(30).seconds(0) });
				clearInterval(restinterval);
				mySound.play();
				this.wait();
			} else {
				this.setState({ currentTime: moment().hours(0).minutes(5).seconds(0) });
				var restinterval = setInterval(() => {
					this.setState({ currentTime: this.state.currentTime.subtract(1, "seconds") });
					if ((this.state.currentTime.isBefore(moment({ hour: 0, minute: 0, second: 1 })))) {
						clearInterval(restinterval);
						if (this.state.cunter > 0)
							this.start();
					}
				}, 1000);
			}
		});
	}


	wait() {
		var lastInterval = setInterval(() => {
			this.setState({ currentTime: this.state.currentTime.subtract(1, "seconds") });
			if ((this.state.currentTime.isBefore(moment({ hour: 0, minute: 0, second: 1 }))))
				clearInterval(lastInterval);
		}, 1000);
	}


	handleStart = () => {
		console.clear();
		this.start();
	}


	render() {
		return (
			<div>
				<div class="container">
					<div class="row justify-content-md-center">
						<div class="col col-lg-2">
							<img src={this.state.image_src} height="60" width="60" />
						</div>
					</div>
					<div className="d-block mx-auto" >
						<div className="row">
							<h3 className="d-block mx-auto">{this.state.state}</h3>
						</div>
					</div>
				</div>

				<div className="row">
					<h1 className="d-block mx-auto">
						{this.state.currentTime.format("HH:mm:ss")}  </h1>
				</div>
				<div className="button">
					<button className="btn btn-danger d-block mx-auto" onClick={this.handleStart}>Start</button>
				</div>
				<hr />
			</div>
		);
	}
}
export default TimerButton;

