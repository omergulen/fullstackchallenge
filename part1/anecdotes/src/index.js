import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Anectode = ({ anectode, vote, handleVote }) => (
  <div>
    <p>{anectode}</p>
    <p>has {vote} votes</p>
    <Button handleClick={handleVote} text='vote' />
  </div>
)

const Title = ({ text }) => (<h1>{text}</h1>)

const DailyAnectode = ({ anectode, vote, handleVote, handleNextQuote }) => (
  <div>
    <Title text='Anectode of the day' />
    <Anectode anectode={anectode} vote={vote} handleVote={handleVote} />
    <Button handleClick={handleNextQuote} text='next anectode' />
  </div>
)

const AnectodeWithMostVotes = ({ anectode, vote, handleVote }) => (
  <div>
    <Title text='Anectode with most votes' />
    <Anectode anectode={anectode} vote={vote} handleVote={handleVote} />
  </div>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(anecdotes.map(el => 0))
  const maxIndex = votes.indexOf(Math.max(...votes));

  const handleNextQuote = () => setSelected(Math.floor(Math.random() * props.anecdotes.length))
  const handleVote = (index) => {
    let newVotes = [...votes];
    newVotes[index]++;
    setVotes(newVotes);
  }
  return (
    <div>
      <DailyAnectode
        anectode={props.anecdotes[selected]}
        vote={votes[selected]}
        handleVote={() => handleVote(selected)}
        handleNextQuote={handleNextQuote}
      />
      <AnectodeWithMostVotes
        anectode={props.anecdotes[maxIndex]}
        vote={votes[maxIndex]}
        handleVote={() => handleVote(maxIndex)}
      />
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
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)