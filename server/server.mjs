import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { StringOutputParser } from "@langchain/core/output_parsers";
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/createNotes", async (req, res) => {
  const { text } = req.body;
  const model = new ChatOpenAI({ model: "gpt-4", openAIApiKey: process.env.OPENAI_API_KEY});
  const messages = [
    new SystemMessage("create notes from this message"),
    new HumanMessage(text),
  ];
  const result = await model.invoke(messages);
  const parser = new StringOutputParser();
  const summary = await parser.invoke(result);
  res.json(summary);
  console.log(summary);
});


app.listen(3001, () => {
  console.log('Server is running on port 3001');
});