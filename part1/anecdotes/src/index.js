import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}> {props.text}
  </button>
)

const MostPopularAph = (props) => {
  // console.log('were looking in the MPA')
/*

  let mostVotes = 0
  for (var i = 0; i<props.points.length; i++) {
    if (props.points[i] > mostVotes)
      props.setBest(i)
      console.log(props.bestAphorism)
  }
*/
  if (props.bestAphorism < 6)
    return (
      <div>
        <h1>Most popular aphorism</h1>
        {props.anecdotes[props.bestAphorism]}
      </div>
    )
  else return null
}

const App = (props) => {
  const [bestAphorism, setBestAphorism] = useState(6)
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0])
  // console.log('Im resetting things, because Im a jerk!')




  const nextAnecdote = (v) => {
    setSelected(v)
  }

  const addVote = (v) => {
    let copy = points
    copy[v] += 1
    setPoints(copy)

    console.log(points)

    let mostVotes = 0
    for (var i = 0; i<points.length; i++) {
      if (points[i] > mostVotes) {
        mostVotes = points[i]
        // console.log(mostVotes)
        setBestAphorism(i)
        // console.log(bestAphorism)
      }
    }

  }



  return (
    <div>
      <h1> Aphorism of the day </h1>
      {props.anecdotes[selected]}
      <div>
        <Button handleClick = {
          () => addVote(selected)}
          text = 'Vote' />
        <Button handleClick = {
          () => nextAnecdote(Math.floor
            ((Math.random()*6)))}
          text = 'Next aphorism' />
      </div>
      <MostPopularAph bestAphorism = {bestAphorism} anecdotes = {props.anecdotes}
      setBest={setBestAphorism} points ={points} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(
  <App anecdotes={anecdotes}/>,
  document.getElementById('root')
)
