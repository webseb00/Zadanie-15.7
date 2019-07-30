class Stopwatch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			running: false,
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			},
			catchTime: []
		};
		this.start = this.start.bind(this);
		this.stop = this.stop.bind(this);
		this.calculate = this.calculate.bind(this);
		this.resetWatch = this.resetWatch.bind(this);
	}

	reset() {
		this.setState({
			running: false,
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			}
		});
	}

	format(times) {
		this.state.catchTime = `${this.pad0(this.state.times.minutes)}:${this.pad0(this.state.times.seconds)}:${this.pad0(Math.floor(this.state.times.miliseconds))}`;
		return this.state.catchTime;
	}

	pad0(value) {
		let result = value.toString();
		if(result.length < 2) {
			result = '0' + result;
		}
		return result;
	}

	start() {
		if(!this.state.running) {
			this.setState({
				running: true
			});
			this.watch = setInterval(() => this.step(), 10);
		}
	}

	step() {
		if(!this.state.running) {
			return
		}
		this.calculate();
	}

	calculate() {
	    this.state.times.miliseconds += 1;
	    if (this.state.times.miliseconds >= 100) {
	        this.state.times.seconds += 1;
	        this.state.times.miliseconds = 0;
	    }
	    if (this.state.times.seconds >= 60) {
	        this.state.times.minutes += 1;
	        this.state.times.seconds = 0;
	    }
	    this.setState({
	      times: this.state.times
	    });
	}

	stop() {
		this.setState({
			running: false
		});
		clearInterval(this.watch);
	}

	resetWatch() {
		this.setState({
			running: false
		});
		this.reset();
	}

	render() {
		const { catchTime, times } = this.state;
		return (
			<div className="container">
				<nav className="controls">
					<a href="#" onClick={this.start} className="button button--start" id="start">Start</a>
			        <a href="#" onClick={this.stop} className="button button--stop" id="stop">Stop</a>
			        <a href="#" onClick={this.resetWatch} className="button button--reset" id="reset">Reset</a>    
				</nav>
				<div className="stopWatch">{this.format(times)}</div>
				<Results catchTime={catchTime} />
			</div>
		)
	}
}

// Time list

class Results extends React.Component {
	constructor(props) {
		super(props);
		this.renderListItem = this.renderListItem.bind(this);
	}
	// render time on list
	renderListItem() {
		const timeList = document.querySelector('.results');
		let timeItem = this.props.catchTime;
		let node = document.createElement('li');
		let content = document.createTextNode(timeItem);
		node.appendChild(content);
		timeList.appendChild(node);
	}
	// remove times from list
	removeList() {
		const timeList = document.querySelector('.results');
		let listChild = timeList.children.length;

		for(let i=0;i < listChild;i++) {
			timeList.removeChild(timeList.children[0]);
		}
	}

	render() {
		return (
			<div>
				<ol className="results"></ol>
				<a href="#" onClick={this.renderListItem} className="button button--add" id="addToList">Add to list</a>
				<a href="#" onClick={this.removeList} className="button button--reset" id="resetList">Reset list</a>
			</div>
		)
	}
}


const element = React.createElement(Stopwatch);
ReactDOM.render(element, document.getElementById('app'));

