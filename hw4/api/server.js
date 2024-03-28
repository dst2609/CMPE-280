// imports
const taxKeywords = require("./taxKeywords.json").keywords; // Keywords that should be present in a tax-related question
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

// Middleware for front end and backend connection
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  // Check if the message contains tax-related keywords
  const isTaxRelated = taxKeywords.some((keyword) =>
    message.toLowerCase().includes(keyword)
  );

  if (!isTaxRelated) {
    return res.json({
      message:
        "Please ask a tax-related question. For example, 'How can I itemize deductions on my tax return?'",
    });
  }

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4", //using newwer gpt, gpt 3.5 was not learning as expected.
        messages: [{ role: "user", content: `As a tax expert, ${message}` }],
        // max_tokens: 150,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    // console.log("Reply is: ", reply);
    res.json({ message: reply });
  } catch (error) {
    console.error("Error in OpenAI API call:", error);
    res.status(500).send("Error getting response from the AI");
  }
});

// Define the default GET route for "/" this is for api-test
app.get("/", (req, res) => {
  res.send("Hello, this is the HW4 Deloitte Auditor Enterprise Chat UI");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
