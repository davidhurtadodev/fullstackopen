import { useState } from 'react';

const Button = (props) => (
  <button type="button" onClick={props.handleClick}>
    {props.text}
  </button>
);
const Statistics = ({ good, neutral, bad }) => {
  if (good !== 0 || neutral !== 0 || bad !== 0) {
    return (
      <table>
        <tbody>
          <StatisticLine text={'good'} value={good} />
          <StatisticLine text={'neutral'} value={neutral} />
          <StatisticLine text={'bad'} value={bad} />
          <StatisticLine text={'all'} value={good + neutral + bad} />
          <StatisticLine
            text={'average'}
            value={(good - bad) / (good + neutral + bad)}
          />
          <StatisticLine
            text={'positive'}
            value={(100 * good) / (good + neutral + bad)}
            symbol={'%'}
          />
        </tbody>
      </table>
    );
  }
  return <h1>no feedback given</h1>;
};
const StatisticLine = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>
      {props.value}
      {props.symbol}
    </td>
  </tr>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text={'good'} />
      <Button handleClick={() => setNeutral(neutral + 1)} text={'neutral'} />
      <Button handleClick={() => setBad(bad + 1)} text={'bad'} />
      <h1>Statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
      {/* <p>No feedback given</p>
      <Statistic text={'good'} feedback={good} />
      <Statistic text={'neutral'} feedback={neutral} />
      <Statistic text={'bad'} feedback={bad} />
      <Statistic text={'all'} feedback={good + neutral + bad} />
      <Statistic
        text={'average'}
        feedback={(good - bad) / (good + neutral + bad)}
      />
      <Statistic
        text={'positive'}
        feedback={good / (good + neutral + bad)}
        symbol={'%'}
      /> */}
    </div>
  );
};

export default App;
