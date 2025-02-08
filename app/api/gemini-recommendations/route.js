import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { jobDescription } = await req.json();

    if (!jobDescription) {
      return new Response(JSON.stringify({ error: "Job description is required." }), { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Suggest top 5 online courses based on the following job description: "${jobDescription}". Provide course names only.`;

    const response = await model.generateContent(prompt);
    const text = response.response.text();

    return new Response(JSON.stringify({ recommendations: text.split("\n") }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
