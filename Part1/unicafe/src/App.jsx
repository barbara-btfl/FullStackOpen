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
} from "@chakra-ui/react";

const App = () => {
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
        {/* statistics */}
        <Table variant="simple" width="auto">
          <Tbody>
            <Tr>
              <Td>good</Td>
              <Td>{good}</Td>
            </Tr>
            <Tr>
              <Td>neutral</Td>
              <Td>{neutral}</Td>
            </Tr>
            <Tr>
              <Td>bad</Td>
              <Td>{bad}</Td>
            </Tr>
            <Tr>
              <Td>all</Td>
              <Td>{good + neutral + bad}</Td>
            </Tr>
            <Tr>
              <Td>average</Td>
              <Td>
                {good + neutral + bad === 0
                  ? 0
                  : (good - bad) / (good + neutral + bad)}
              </Td>
            </Tr>
            <Tr>
              <Td>positive</Td>
              <Td>
                {good + neutral + bad === 0
                  ? "0 %"
                  : ((good / (good + neutral + bad)) * 100).toFixed(1) + " %"}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </VStack>
    </>
  );
};

export default App;
