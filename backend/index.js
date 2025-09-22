// backend/index.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    const { prompt, history } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "API key not configured." });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    // choose a model, e.g. gemini-1.5-flash
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // optionally send conversation history
    let inputPrompt = prompt;
    // If you want to send history too, you could form messages array or context.

    const result = await model.generateContent(inputPrompt);
    // The result structure depends on the library version. Adjust accordingly.
    const responseText =
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "❌ No response from model";

    return res.json({ response: responseText });
  } catch (err) {
    console.error("Error in /api/chat:", err);
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.listen(port, () => {
  console.log(`Backend server listening on http://localhost:${port}`);
});
