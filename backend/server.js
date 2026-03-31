const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());


const GROQ_API_KEY = process.env.GROQ_API_KEY;


app.post("/generate", async (req, res) => {
  try {
    const { keyword } = req.body;

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "user",
            content: `
Generate SEO content for "${keyword}" with:
- Title
- Meta Description
- Keywords
- Article with headings
- Use simple language
- Make it human-like and non-generic
`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    const result = response.data.choices[0].message.content;

    res.json({ content: result });
  } catch (error) {
    console.log(error.response?.data || error.message);
    res.status(500).send("Error generating content");
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));