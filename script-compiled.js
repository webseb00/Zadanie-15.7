"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
	_inherits(Stopwatch, _React$Component);

	function Stopwatch(props) {
		_classCallCheck(this, Stopwatch);

		var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this, props));

		_this.state = {
			running: false,
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			},
			catchTime: []
		};
		_this.start = _this.start.bind(_this);
		_this.stop = _this.stop.bind(_this);
		_this.calculate = _this.calculate.bind(_this);
		_this.resetWatch = _this.resetWatch.bind(_this);
		return _this;
	}

	_createClass(Stopwatch, [{
		key: "reset",
		value: function reset() {
			this.setState({
				running: false,
				times: {
					minutes: 0,
					seconds: 0,
					miliseconds: 0
				}
			});
		}
	}, {
		key: "format",
		value: function format(times) {
			this.state.catchTime = this.pad0(this.state.times.minutes) + ":" + this.pad0(this.state.times.seconds) + ":" + this.pad0(Math.floor(this.state.times.miliseconds));
			return this.state.catchTime;
		}
	}, {
		key: "pad0",
		value: function pad0(value) {
			var result = value.toString();
			if (result.length < 2) {
				result = '0' + result;
			}
			return result;
		}
	}, {
		key: "start",
		value: function start() {
			var _this2 = this;

			if (!this.state.running) {
				this.setState({
					running: true
				});
				this.watch = setInterval(function () {
					return _this2.step();
				}, 10);
			}
		}
	}, {
		key: "step",
		value: function step() {
			if (!this.state.running) {
				return;
			}
			this.calculate();
		}
	}, {
		key: "calculate",
		value: function calculate() {
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
	}, {
		key: "stop",
		value: function stop() {
			this.setState({
				running: false
			});
			clearInterval(this.watch);
		}
	}, {
		key: "resetWatch",
		value: function resetWatch() {
			this.setState({
				running: false
			});
			this.reset();
		}
	}, {
		key: "render",
		value: function render() {
			var _state = this.state,
			    catchTime = _state.catchTime,
			    times = _state.times;

			return React.createElement(
				"div",
				{ className: "container" },
				React.createElement(
					"nav",
					{ className: "controls" },
					React.createElement(
						"a",
						{ href: "#", onClick: this.start, className: "button button--start", id: "start" },
						"Start"
					),
					React.createElement(
						"a",
						{ href: "#", onClick: this.stop, className: "button button--stop", id: "stop" },
						"Stop"
					),
					React.createElement(
						"a",
						{ href: "#", onClick: this.resetWatch, className: "button button--reset", id: "reset" },
						"Reset"
					)
				),
				React.createElement(
					"div",
					{ className: "stopWatch" },
					this.format(times)
				),
				React.createElement(Results, { catchTime: catchTime })
			);
		}
	}]);

	return Stopwatch;
}(React.Component);

// Time list

var Results = function (_React$Component2) {
	_inherits(Results, _React$Component2);

	function Results(props) {
		_classCallCheck(this, Results);

		var _this3 = _possibleConstructorReturn(this, (Results.__proto__ || Object.getPrototypeOf(Results)).call(this, props));

		_this3.renderListItem = _this3.renderListItem.bind(_this3);
		return _this3;
	}
	// render time on list


	_createClass(Results, [{
		key: "renderListItem",
		value: function renderListItem() {
			var timeList = document.querySelector('.results');
			var timeItem = this.props.catchTime;
			var node = document.createElement('li');
			var content = document.createTextNode(timeItem);
			node.appendChild(content);
			timeList.appendChild(node);
		}
		// remove times from list

	}, {
		key: "removeList",
		value: function removeList() {
			var timeList = document.querySelector('.results');
			var listChild = timeList.children.length;

			for (var i = 0; i < listChild; i++) {
				timeList.removeChild(timeList.children[0]);
			}
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				null,
				React.createElement("ol", { className: "results" }),
				React.createElement(
					"a",
					{ href: "#", onClick: this.renderListItem, className: "button button--add", id: "addToList" },
					"Add to list"
				),
				React.createElement(
					"a",
					{ href: "#", onClick: this.removeList, className: "button button--reset", id: "resetList" },
					"Reset list"
				)
			);
		}
	}]);

	return Results;
}(React.Component);

var element = React.createElement(Stopwatch);
ReactDOM.render(element, document.getElementById('app'));
