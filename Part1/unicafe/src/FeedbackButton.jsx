import { Button } from "@chakra-ui/react";

const FeedbackButton = ({ onClick, text }) => {
  return (
    <Button onClick={onClick} colorScheme="blue">
      {text}
    </Button>
  );
};

export default FeedbackButton;
