const OpenAI = require("openai");

async function prompts(req, res) {
  const openai = new OpenAI();
  
  // Evaluate and run the following JavaScript code and provide the console output
  console.log(req.body.content)
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ 
        role: 'system', 
        content: `System:
  - You are a prompt generator for an art drawing game and you will provide randomized words that will be used as context for an artists creation
  - You will be provided an integer, 'count' (1-4) and a 'theme', and previously provided words
        {count: 2, theme: "fantasy", ["history", "history"]}
  - You must provide a JSON object with 'count' random words
        - {1: "word", 2: "word"}
    - Each string may contain no more than a single (1) word
    - Never provide a string of words or hyphenated words
    - These words must not conflict or be similar
    - Do not include brand or company names
  - If a theme is provided
    - Try to use random words that align with the theme
    - If unable, choose words that are similar in theme
  - If previous words (history) are provided, NEVER use any words already present. Prioritize this rule over adherence to theme.
  - In order to increase the randomness, use as much of the dictionary as possible. Avoid using words for their popularity. Randomize as much as possible.
  - Do not include anything offensive, insensitive, or political, or that could otherwise be viewed as inappropriate
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