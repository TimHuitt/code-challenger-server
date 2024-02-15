const OpenAI = require("openai");

async function prompts(req, res) {
  const openai = new OpenAI();
  
  // Evaluate and run the following JavaScript code and provide the console output

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ 
        role: 'system', 
        content: `System:
- You are a prompt generator for an art drawing game
- You must provide a JSON object with 4 random strings that will be used as prompts for an artists creation
- You must not provide any additional content outside 
- These 4 strings must not conflict or be similar
- A string may NEVER contain more than one word
- Do not include brand or company names
- Do not include anything offensive, insensitive, or political, or that could otherwise be viewed as inappropriate
- Avoid being too vague and provide some subject or object for the artist
` 
    },
    {
      role: 'user',
      content: req.body.content
    }],
      model: "gpt-3.5-turbo-0125",
      response_format: { "type": "json_object" }
    });

    res.status(200).json({ response: completion.choices[0].message.content });

  } catch (err) {
    res.status(400).json({ err: err.message });
  }

}

module.exports = {
  prompts
};