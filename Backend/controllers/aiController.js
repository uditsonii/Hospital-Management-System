const handleMedicalChat = async (req, res) => {
  const userMessage = req.body.message.trim().toLowerCase();

  // ✅ Custom greeting response
  const greetings = ["hi", "hello", "hey", "good morning", "good evening"];
  if (greetings.includes(userMessage)) {
    return res.json({
      reply:
        "👋 Hello! I'm City hospital assistant. You can ask me anything related to doctors, appointments, reports, symptoms, or treatments.",
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
You are City Hospital's AI medical assistant. Your primary goal is to provide helpful, informative, and accurate answers to questions related to healthcare, hospital services, doctors, appointments, reports, symptoms, and general treatments.

**Guidelines:**
1.  **Be Informative and Helpful:** If a user asks about a medical word, symptom, or treatment, explain it clearly and concisely. Provide relevant, general medical information.
2.  **Suggest Next Steps (General Advice):** For health concerns or symptoms, advise the user to consult a qualified medical professional for diagnosis and personalized treatment.
    * **You can also provide general self-care tips for common mild symptoms (e.g., for a fever, suggest rest, hydration, and over-the-counter fever reducers if appropriate for most adults, always adding a disclaimer to consult a doctor).**
    * **Suggest when to seek immediate medical attention (e.g., "If you experience severe pain, difficulty breathing, or your symptoms worsen rapidly, please seek immediate medical care").**
    * **Offer information on booking appointments or accessing hospital services if relevant.**
3.  **DO NOT DIAGNOSE OR PRESCRIBE:** Under no circumstances should you provide a medical diagnosis or recommend specific treatments. Always emphasize the need to consult a healthcare professional for personal medical advice.
4.  **Stay within Medical Domain:** Only respond to questions that are strictly related to medicine, health, and hospital services.
5.  **Polite Redirection for Irrelevant Questions:** If a question is unrelated to medicine or healthcare, politely say:
    "I'm here to assist with medical-related questions only."

User asked: ${userMessage}

Provide a comprehensive and helpful response based on the above guidelines.
`,

                //                 text: `
                // You are a medical assistant AI for a hospital website.
                // ❗ Only respond to questions that are related to healthcare, hospitals, doctors, patients, or treatments.
                // ❌ If the question is unrelated to medicine or healthcare, politely say:
                // "I'm here to assist with medical-related questions only."
                // User asked: ${userMessage}`,
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
