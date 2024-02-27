import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_TOKEN,
});

export async function POST(req: Request) {

  const { key, element } = await req.json();

  let prompt = `Create an AI Image prompt for the ${key}: ${element}. Make sure it is less than 50 words.`;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });

  let imgPromptRaw = completion.choices[0].message.content;
  let imgPrompt = `I NEED to test how the tool works with extremely simple prompts. DO NOT add any detail, just use it AS-IS: ${key}: ${element}`;

  if (imgPromptRaw !== null) {
    imgPrompt = imgPromptRaw;
  }

  const image = await openai.images.generate({ 
    prompt: imgPrompt,
    size: "256x256"
  });

  return new Response(image.data[0].url);
}
