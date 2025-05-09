const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const API_KEY = 'AIzaSyBjptcdGVz9N0Ijtudh9QnWVp0XzyWHUugE';
const GEMINI_URL = https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY};

app.post('/generate-motivation', async (req, res) => {
  const { mood } = req.body;

  const prompt = Give me a short motivational quote and a follow-up message for someone feeling ${mood}.;

  try {
    const geminiRes = await axios.post(GEMINI_URL, {
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ]
    });

    const aiText = geminiRes.data.candidates[0].content.parts[0].text;

    const [quote, ...rest] = aiText.split("\n");
    const advice = rest.join(" ");

    res.json({
      messages: [
        { text: quote.trim() },
        { text: advice.trim() }
      ]
    });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Error generating motivation' });
  }
});

const PORT = process.env.PORT || 4567;
app.listen(PORT, () => {
  console.log(Server is running on port ${PORT});
});