const handleMedicalChat = async (req, res) => {
  const userMessage = req.body.message.trim().toLowerCase();

  // ✅ Custom greeting response
  const greetings = ["hi", "hello", "hey", "good morning", "good evening"];
  if (greetings.includes(userMessage)) {
    return res.json({
      reply:
        "👋 Hello! I'm Jeevan Jyoti hospital assistant. You can ask me anything related to doctors, appointments, reports, symptoms, or treatments.",
    });
  }

  try {
    const geminiURL =
      "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=" +
      process.env.GEMINI_API_KEY;

    const response = await fetch(geminiURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `
You are a medical assistant AI for a hospital website. 
❗ Only respond to questions that are related to healthcare, hospitals, doctors, patients, or treatments.
❌ If the question is unrelated to medicine or healthcare, politely say:
"I'm here to assist with medical-related questions only." 
User asked: ${userMessage}`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.4,
          topK: 40,
          topP: 0.9,
          maxOutputTokens: 1024,
        },
      }),
    });

    const data = await response.json();
    
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "⚠️ Gemini did not return any text.";

    res.json({ reply });
  } catch (err) {
    console.error("❌ Gemini API Error:", err.message);
    res
      .status(500)
      .json({ reply: "Sorry, something went wrong. Please try again later." });
  }
};
module.exports = { handleMedicalChat };