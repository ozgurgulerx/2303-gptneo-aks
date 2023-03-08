import {
  ChakraProvider,
  Heading,
  Container,
  Input,
  Button,
  Text,
  Wrap,
  Box,
  Textarea
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

const App = () => {
  const [output, updateOutput] = useState(""); //output is what we are receiving back from the API
  const [prompt, updatePrompt] = useState(""); //prompt is the text we are sending to the API



  const generate = async (prompt) => {


  const result = await axios.post('https://nlp-sentiment6.azurewebsites.net/sentimentAnalysis', {"text": prompt});
  console.log(JSON.stringify(result.data));
  updateOutput(JSON.stringify(result.data));

};
  return (
    <ChakraProvider>
      <Container>
        <Heading>Sentiment Analysis with ROBERTA</Heading>
        <Text marginBottom={"10px"}>
          This react application leverages the NLP model ROBERTA trained by
          Hugging Face and generates weather sentiment within a text is positive
          or negative.{" "}
        </Text>
        <Wrap marginBottom={"10px"}>
          <Input
            value={prompt}
            onChange={(e) => updatePrompt(e.target.value)}
            width={"350px"}
          ></Input>

          <Button onClick={(e) => generate(prompt)} colorScheme={"yellow"}>
            Generate
          </Button>
          </Wrap>
        <Box bg="purple.100">
        <Textarea value={output} />
        </Box>

      </Container>
    </ChakraProvider>
  );
};

export default App;
