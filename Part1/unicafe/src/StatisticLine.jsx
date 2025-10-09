import { Tr, Td } from "@chakra-ui/react";

const StatisticLine = ({ text, value }) => {
  return (
    <Tr>
      <Td>{text}</Td>
      <Td>{value}</Td>
    </Tr>
  );
};

export default StatisticLine;
