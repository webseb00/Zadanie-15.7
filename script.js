class Stopwatch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			running: false,
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			}
		};
		this.reset();
		this.print(this.times);
	}

	reset() {
		this.setState({
			running: false,
			this.times = {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			}
		});
	}

	print() {
		this.display.innerText = this.format(this.times);
		this.save = {
			time: this.display.innerText
		}
	}

	format(times) {
		return `${this.pad0(this.state.times.minutes)}:${this.pad0(this.state.times.seconds)}:${this.pad0(Math.floor(this.state.times.miliseconds))}`;
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
		this.print();
	}

	calculate() {
	    this.times.miliseconds += 1;
	    if (this.times.miliseconds >= 100) {
	        this.times.seconds += 1;
	        this.times.miliseconds = 0;
	    }
	    if (this.times.seconds >= 60) {
	        this.times.minutes += 1;
	        this.times.seconds = 0;
	    }
	}

	stop() {
		this.state.running = false;
		clearInterval(this.watch);
	}

	resetWatch() {
		this.running = false;
		this.reset();
		this.print();
	}

	saveTime() {
		let timeItem = this.save.time;
		let node = document.createElement('li');
		let content = document.createTextNode(timeItem);
		node.appendChild(content);
		timeList.appendChild(node); 
	}

	removeList() {
		let listChild = timeList.children.length;

		for(let i=0;i<listChild;i++) {
			timeList.removeChild(timeList.children[0]);
		}
	}

	render() {
		return (
			<div className="container">
				<nav className="controls">
					<a href="#" onClick={this.start} class="button button--start" id="start">Start</a>
			        <a href="#" onClick={this.stop} class="button button--stop" id="stop">Stop</a>
			        <a href="#" onClick={this.resetWatch} class="button button--reset" id="reset">Reset</a>
			        <a href="#" onClick={this.saveTime} class="button button--add" id="addToList">Add to list</a>
				</nav>
				<div className="stopWatch"></div>
				<ol className="results"></ol>
				<a href="#" onClick={this.removeList} class="button button--reset" id="resetList">Reset list</a>
			</div>
		)
	}
}


// let startButton = document.getElementById('start');
// let stopButton = document.getElementById('stop');
// let resetButton = document.getElementById('reset');
// let addListButton = document.getElementById('addToList');
// let resetList = document.getElementById('resetList');
// const timeList = document.querySelector('.results');

const element = React.createElement(Stopwatch);
ReactDOM.render(element, document.getElementById('app'));