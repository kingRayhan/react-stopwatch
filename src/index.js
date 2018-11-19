import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class StopWatch extends React.Component {
  state = {
    milisecond: 0,
    laps: [],
    running: false
  };

  componentDidUpdate() {
    if (!this.state.running) return;
    setTimeout(
      () => this.setState(p => ({ milisecond: p.milisecond + 1 })),
      10
    );
  }

  makeLaps = () => {
    const laps = [...this.state.laps];
    laps.push(this.state.milisecond);
    this.setState({ laps });
  };

  formatTime = milisecond => ({
    m: Math.floor(milisecond / 100 / 60),
    s: Math.floor(milisecond / 100),
    mi: Math.floor(milisecond % 100)
  });

  render() {
    const { laps, milisecond, running } = this.state;
    const formattedTime = this.formatTime(milisecond);
    return (
      <Fragment>
        <div class="container">
          <h2>React Stopwatch</h2>
          <h1 id="display">
            {formattedTime.m}:{formattedTime.s}:{formattedTime.mi}
          </h1>
          <div>
            {running ? (
              <Fragment>
                <button onClick={() => this.setState({ running: false })}>
                  Pause
                </button>
                <button onClick={this.makeLaps}>Lap</button>
              </Fragment>
            ) : (
              <button onClick={() => this.setState({ running: true })}>
                Start
              </button>
            )}

            {!running && (
              <button
                onClick={() => this.setState({ milisecond: 0, laps: [] })}
              >
                Reset
              </button>
            )}
          </div>
          {laps.length !== 0 && (
            <div className="laps">
              <h4>Laps</h4>
              <ul>
                {laps.map((lap, i) => (
                  <li>
                    Lap {++i}: {this.formatTime(lap).m}:{this.formatTime(lap).s}
                    :{this.formatTime(lap).mi}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<StopWatch />, rootElement);
