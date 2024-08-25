// // Write your code here

import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    fixTime: 25,
    startOrPause: true,
    timer: '25:00',
    elapsedSeconds: 0,
  }

  componentDidMount() {
    this.timerID = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick = () => {
    const {fixTime, startOrPause, elapsedSeconds} = this.state

    if (!startOrPause) {
      const totalRemainingSeconds = fixTime * 60 - elapsedSeconds - 1

      if (totalRemainingSeconds >= 0) {
        const minutes = Math.floor(totalRemainingSeconds / 60)
        const seconds = Math.floor(totalRemainingSeconds % 60)
        const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
        const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

        this.setState({
          timer: `${stringifiedMinutes}:${stringifiedSeconds}`,
          elapsedSeconds: elapsedSeconds + 1,
        })
      } else {
        this.onReset()
      }
    }
  }

  onDecrement = () => {
    this.setState(prevState => {
      if (prevState.fixTime > 1 && prevState.startOrPause) {
        return {
          fixTime: prevState.fixTime - 1,
          timer: `${prevState.fixTime - 1}:00`,
        }
      }
      return null
    })
  }

  onIncrement = () => {
    this.setState(prevState => {
      if (prevState.startOrPause) {
        return {
          fixTime: prevState.fixTime + 1,
          timer: `${prevState.fixTime + 1}:00`,
        }
      }
      return null
    })
  }

  onStartOrPause = () => {
    this.setState(prevState => ({startOrPause: !prevState.startOrPause}))
  }

  onReset = () => {
    this.setState({
      fixTime: 25,
      timer: '25:00',
      startOrPause: true,
      elapsedSeconds: 0,
    })
  }

  render() {
    const {fixTime, startOrPause, timer} = this.state

    return (
      <div className="main-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="container-one">
          <div className="timering-container">
            <div className="bg-container">
              <h1>{timer}</h1>
              {startOrPause ? (
                <p className="time-set">Paused</p>
              ) : (
                <p className="time-set">Running</p>
              )}
            </div>
          </div>
          <div className="second-container">
            <div className="state-reset-container">
              <img
                src={
                  startOrPause
                    ? 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                }
                className="icon"
                alt={startOrPause ? 'play icon' : 'pause icon'}
                onClick={this.onStartOrPause}
              />
              <button
                type="button"
                className="heading-Start-reset"
                onClick={this.onStartOrPause}
              >
                {startOrPause ? 'Start' : 'Pause'}
              </button>
              <img
                src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                className="icon"
                alt="reset icon"
                onClick={this.onReset}
              />
              <button
                type="button"
                className="reset-text"
                onClick={this.onReset}
              >
                Reset
              </button>
            </div>

            <div className="in-de-container">
              <div className="time-limit-container">
                <p className="timer-limit-text">Set Timer limit</p>
              </div>
              <div className="btn-container">
                <button
                  className="btn"
                  type="button"
                  onClick={this.onDecrement}
                >
                  -
                </button>
                <p className="timer">{fixTime}</p>
                <button
                  className="btn"
                  type="button"
                  onClick={this.onIncrement}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
