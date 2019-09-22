import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = ({ text }) => (<h1>{text}</h1>)

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const GiveFeedback = ({ handleGood, handleNeutral, handleBad }) => {
  return (
    <div>
      <Title text='give feedback' />
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />
    </div>
  )
}

const Statistic = ({ text, count, unit }) => (<p>{text} {count} {unit ? unit : ''}</p>)

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad

  return (
    <div>
      <Title text='statistics' />
      {
        total > 0 ?
          <div>
            <Statistic text='good' count={good} />
            <Statistic text='neutral' count={neutral} />
            <Statistic text='bad' count={bad} />
            <Statistic text='average' count={(good * 1 + bad * -1) / total} />
            <Statistic text='positive' count={good / total} unit='%' />
          </div> :
          <p>
            No feedback given
          </p>
      }
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <div>
      <GiveFeedback
        handleGood={handleGood}
        handleNeutral={handleNeutral}
        handleBad={handleBad}
      />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)