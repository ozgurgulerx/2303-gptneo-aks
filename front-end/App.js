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


  const result = await axios.post('http://20.90.140.241:8000/gptneo', {"text": prompt});
  console.log(JSON.stringify(result.data));
  updateOutput(JSON.stringify(result.data[0]['generated_text']));
  
};
  return (
    <ChakraProvider>
      <Container>
        <Heading>The frugal LLM - GPT-neo </Heading>
        <Text marginBottom={"10px"}>
          This application uses LLM model GPT-neo with 2.7billion parameters from EleutherAI.{" "}
          In terms of performance, GPT-3 is currently one of the most advanced language models available, {" "}
          with over 175 billion parameters, while Neo-GPT has significantly fewer parameters, currently at around 2.7 billion.{" "} 
          However, Neo-GPT has still demonstrated impressive language capabilities, especially given its smaller size."{" "}
        </Text>
        <Text marginBottom={"10px"}>
          I don't have access to a GPU (yet!) {" "}
          Please give it 30-40 seconds for the model to generate the text after pressing "Generate"...{" "}
          Hope you will have fun...{" "}
        </Text>
        <Wrap marginBottom={"10px"}>
          <Input
            bg="purple.100"
            value={prompt}
            onChange={(e) => updatePrompt(e.target.value)}
            width={"350px"}
          ></Input>

          <Button onClick={(e) => generate(prompt)} colorScheme={"yellow"}>
            Generate
          </Button>
          </Wrap>
        <Box w='100%' d='50px' p='1' bg="pink.200"> 
        <Textarea value={output} />
        </Box>

      </Container>
    </ChakraProvider>
  );
};

export default App;
