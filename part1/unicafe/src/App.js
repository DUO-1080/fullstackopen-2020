import React, { useState } from "react";

const Button = ({ onClick, text }) => {
  return (
    <button style={{ margin: "0.2rem" }} name={text} onClick={onClick}>
      {text}
    </button>
  );
};

const Statistics = ({ good, bad, neutral }) => {
  return (
    <table>
      <tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" vlaue={bad} />
        <Statistic text="all" value={good + bad + neutral} />
        <Statistic text="average" value={(bad + good + neutral) / 3} />
        <Statistic
          text="positive"
          value={((good / (bad + good + neutral)) * 100).toFixed(2) + " %"}
        />
      </tbody>
    </table>
  );
};

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td> {text} </td>
      <td> {value} </td>
    </tr>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (e) => {
    switch (e.target.name) {
      case "good":
        setGood(good + 1);
        break;
      case "neutral":
        setNeutral(neutral + 1);
        break;
      case "bad":
        setBad(bad + 1);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleClick} text="good" />
      <Button onClick={handleClick} text="neutral" />
      <Button onClick={handleClick} text="bad" />
      <h1>statistics</h1>
      {good || neutral || bad ? (
        <Statistics good={good} bad={bad} neutral={neutral} />
      ) : (
        "No feedback given"
      )}
    </div>
  );
};

export default App;
