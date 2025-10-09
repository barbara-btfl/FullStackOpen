import { useState } from "react";
import {
  Heading,
  Button,
  VStack,
  HStack,
  Text,
  Box,
  Table,
  Tbody,
  Tr,
  Td,
  Stat,
} from "@chakra-ui/react";

export const Statistics = (props) => {
  return (
    <>
      {/* statistics */}
      <Table variant="simple" width="auto">
        <Tbody>
          <Tr>
            <Td>good</Td>
            <Td>{props.good}</Td>
          </Tr>
          <Tr>
            <Td>neutral</Td>
            <Td>{props.neutral}</Td>
          </Tr>
          <Tr>
            <Td>bad</Td>
            <Td>{props.bad}</Td>
          </Tr>
          <Tr>
            <Td>all</Td>
            <Td>{props.good + props.neutral + props.bad}</Td>
          </Tr>
          <Tr>
            <Td>average</Td>
            <Td>
              {props.good + props.neutral + props.bad === 0
                ? 0
                : (props.good - props.bad) /
                  (props.good + props.neutral + props.bad)}
            </Td>
          </Tr>
          <Tr>
            <Td>positive</Td>
            <Td>
              {props.good + props.neutral + props.bad === 0
                ? "0 %"
                : (
                    (props.good / (props.good + props.neutral + props.bad)) *
                    100
                  ).toFixed(1) + " %"}
            </Td>
          </Tr>
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
          <Button onClick={() => setGood(good + 1)}>good</Button>
          <Button onClick={() => setNeutral(neutral + 1)}>neutral</Button>
          <Button onClick={() => setBad(bad + 1)}>bad</Button>
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
