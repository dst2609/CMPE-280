require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static("public")); // Serve your static files

app.post("/analyze", async (req, res) => {
  const { imageUrl } = req.body; // Extract the image URL from the request body

  const payload = {
    model: "gpt-4-vision-preview", // Confirm the model name is correct
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "What’s in this image?" },
          {
            type: "image_url",
            image_url: { url: imageUrl }, // Pass the user-provided image URL
          },
        ],
      },
    ],
  };

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    });

    if (!response.ok) {
      // If the HTTP response does not indicate success, throw an error
      const errorBody = await response.text(); // Attempt to read the response text
      throw new Error(
        `API request failed with status ${response.status}: ${errorBody}`
      );
    }

    const data = await response.json(); // Parse the JSON response body

    // Send the OpenAI API's response back to the client
    res.json(data.choices[0].message.content);
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    res.status(500).send("Error processing the request");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
