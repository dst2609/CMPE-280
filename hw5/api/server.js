const mysql = require("mysql");
const taxKeywords = require("./taxKeywords.json").keywords;
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

// Middleware for front end and backend connection
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Setup MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "dtusername",
  password: "dtpass",
  database: "hw5db",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Successfully connected to the database.");
});

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
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
        model: "gpt-4",
        messages: [{ role: "user", content: `As a tax expert, ${message}` }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ message: reply });

    // Insert prompt and response into the database
    const query = "INSERT INTO ChatHistory (prompt, response) VALUES (?, ?)";
    db.query(query, [message, reply], (err, result) => {
      if (err) {
        console.error("Failed to insert chat into database:", err);
        return;
      }
      console.log("Chat saved in database with ID:", result.insertId);
    });
  } catch (error) {
    console.error("Error in OpenAI API call:", error);
    res.status(500).send("Error getting response from the AI");
  }
});

app.get("/", (req, res) => {
  res.send("Hello, this is the HW4 Deloitte Auditor Enterprise Chat UI");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
