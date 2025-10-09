import { useState } from "react";

// create a helper function to get a random index of an array
const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length);
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  // create an empty array to hold votes for each anecdote in state
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const [selected, setSelected] = useState(0);

  // create a click function that increases the vote count for the selected anecdote
  const handleVote = () => {
    const newVotes = [...votes]; // create a copy of the votes array
    newVotes[selected] += 1; // increase the vote for the selected anecdote
    setVotes(newVotes); // update the state
  };
  //  use the helper function to get a random index of the anecdotes array
  const handleClick = () => {
    const randomIndex = getRandomIndex(anecdotes);
    setSelected(randomIndex);
  };
  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <button onClick={handleVote}>vote</button>
      {/* Button that shows random quote when clicked using the handleClick function */}
      <button onClick={handleClick}>next anecdote</button>
    </>
  );
};

export default App;
