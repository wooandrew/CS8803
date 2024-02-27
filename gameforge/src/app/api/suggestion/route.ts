import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_TOKEN,
});

export async function POST(req: Request) {

  const { content } = await req.json();

  let prompt = `You are a bot that generates a ${content} for a video game. Include only the ${content}, no other information. Do not include the word ${content} in your response.`;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });

  return new Response(completion.choices[0].message.content);
}
