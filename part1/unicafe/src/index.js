import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const Header = () => (
  <h1>Give feedback</h1>
)

const Button = (props) => (
  <button onClick={props.handleClick}> {props.text}
  </button>
)

const Statistic = (props) => (
  <tr>
    <th>{props.text}</th>
    <th>{props.value}</th>
  </tr>
)

const Statistics = (props) => {
  let all = props.bad + props.good + props.neutral

  let average = (props.good - props.bad)/all

  if (all === 0)
    return(
      <>
      <h2>Statistics</h2>
      <div> No feedback given.</div>
      </>
    )

    return(
      <>
        <h2>Statistics</h2>
        <table>
          <tbody>
            <Statistic text="Good:" value={props.good} />
            <Statistic text="Neutral:" value={props.neutral} />
            <Statistic text="Bad:" value={props.bad} />
            <Statistic text="All:" value={all} />
            <Statistic text="Average:" value={average} />
          </tbody>
        </table>

      </>
    )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = (v) => {
    setGood(v)
  }

  const addNeutral = (v) => {
    setNeutral(v)
  }

  const addBad = (v) => {
    setBad(v)
  }

  return (
    <div>
      <Header />
      <Button handleClick = {() => addGood(good + 1)}
        text="Good" />
      <Button handleClick = {() => addNeutral(neutral + 1)}
        text="Neutral" />
      <Button handleClick = {() => addBad(bad + 1)}
        text="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>


    )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
