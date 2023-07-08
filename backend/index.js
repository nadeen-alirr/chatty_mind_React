// Import the required modules:
import { Configuration, OpenAIApi } from "openai";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

// Create an Express app and set the port:
const app = express();
const port = 8080;

// Configure middleware for JSON parsing and CORS.
app.use(bodyParser.json());
app.use(cors());

// Create an instance of the OpenAIApi using the provided configuration:
const configuration = new Configuration({
  organization: "org-gNGh2t2WYIC9ERDLsocPHEI3",
  apiKey: "",
});
const openapi = new OpenAIApi(configuration);

// Define a POST endpoint ("/") to handle incoming chat messages:
app.post("/", async (req, res) => {
  const { chats } = req.body;
  const result = await openapi.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are EbereGpt . You can write emails and letters .",
      },
      ...chats,
    ],
  });
  res.json({
    output : result.data.choices[0].message,
  })
});

// Start the server:
app.listen(port, () => {
  console.log(`Listining on port ${port}`);
});
