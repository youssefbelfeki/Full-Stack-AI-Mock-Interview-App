import { GoogleGenAI } from "@google/genai";

export async function POST(req) {
  try {
    const { jobPosition, jobDescription, jobExperience } = await req.json();

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const tools = [{ googleSearch: {} }];

    const config = {
      thinkingConfig: { thinkingBudget: -1 },
      tools,
    };

    const prompt = `
      You are an AI interview generator.
      Based on these details:
      - Job Position: ${jobPosition}
      - Description: ${jobDescription}
      - Experience: ${jobExperience} years
      Generate ${process.env.Interview_Question_Count} interview questions with answers.
      Return a JSON array:
      [
        { "question": "...", "answer": "..." }
      ]
    `;

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      config,
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    // FIX ICI : extraire le texte
    const output =
      response.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return Response.json({ data: output });
  } catch (err) {
    console.error("API Error:", err);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
