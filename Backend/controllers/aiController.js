const handleMedicalChat = async (req, res) => {
  const userMessage = req.body.message;

  const MEDICAL_KEYWORDS =  [
  "doctor","nurse","patient","appointment","diagnosis","treatment","medicine","prescription","hospital","symptom","disease","surgery","emergency","health","illness","disease","clinic","hospital","symptoms","specialist","consultation","lab","ICU","ambulance","pharmacy","billing","records","admission","discharge","report","follow-up","schedule","teleconsultation"
];

  const isMedicalQuery = MEDICAL_KEYWORDS.some((k) =>
    userMessage.toLowerCase().includes(k)
  );
  if (!isMedicalQuery) {
    return res.json({
      reply: "⚠️ I'm here to help with hospital and medical-related queries only.",
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
                text: `You are a helpful hospital assistant AI. Only respond to medical questions. User asked: ${userMessage}`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.5,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    });

    const data = await response.json();
   console.log("🔍 Gemini raw response:\n", JSON.stringify(data, null, 2));
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
