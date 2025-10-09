import { useState } from "react";
import { Heading, VStack, HStack, Text, Table, Tbody } from "@chakra-ui/react";
import FeedbackButton from "./FeedbackButton";
import StatisticLine from "./StatisticLine";

export const Statistics = (props) => {
  const { good, neutral, bad } = props;
  const all = good + neutral + bad;
  const average = all === 0 ? 0 : (good - bad) / all;
  const positive = all === 0 ? "0 %" : ((good / all) * 100).toFixed(1) + " %";

  return (
    <>
      {/* statistics */}
      <Table variant="simple" width="auto">
        <Tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />
        </Tbody>
      </Table>
    </>
  );
};

export const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <VStack spacing={4} align="center" justify="center" padding={4}>
        <Heading>give feedback</Heading>
        <HStack spacing={8} align="center" justify="center">
          <FeedbackButton onClick={() => setGood(good + 1)} text="good" />
          <FeedbackButton
            onClick={() => setNeutral(neutral + 1)}
            text="neutral"
          />
          <FeedbackButton onClick={() => setBad(bad + 1)} text="bad" />
        </HStack>
        <Heading>statistics</Heading>
        {/* Show only if there is feedback given */}
        {good + neutral + bad > 0 ? (
          <Statistics good={good} neutral={neutral} bad={bad} />
        ) : (
          <Text>No feedback given</Text>
        )}
      </VStack>
    </>
  );
};
