const OpenAI = require("openai");

async function prompts(req, res) {
  const openai = new OpenAI();

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ 
        role: 'system', 
        content: `System:
- Role: Generate diverse, categorized prompts for an art drawing game.
- Input: 'count' (1-4), optional 'theme', and 'history' of previously used words.
- Output: A JSON object with 'count' random, unique words, each from a different specified category.
  - Constraints:
    - Use only single, non-hyphenated words.
    - Avoid similarity and repetition: Exclude any word or its variations if the word is found in 'history'.
    - Prohibit brands, offensive content, or anything inappropriate.
- Theme Handling:
  - If a 'theme' is provided, select words that can creatively align with or complement the theme.
  - Without a specific theme, choose words that span a wide range of concepts for broad applicability.
  - If theme includes 'useEmoji', Follow the same guidelines as words but provide HTML emoji codes instead.
  - If theme includes 'useEmoji', Try to vary the category of each emoji.
  - If theme includes 'useEmoji', Never include any text or descriptions. Only provide the HTML emoji codes.
  - If theme includes 'useEmoji, [theme]', Use emojis that match the theme. 
  - If theme includes 'useEmoji, [theme]', If not possible, use random.
- History Compliance:
  - The words included within 'history' are restricted for safety. Strictly prohibit using any words, and it's inflected forms, listed in 'history' to ensure safety. Case insensitive. 
- Diversity and Randomization:
  - Commit to selecting words from across the entire dictionary, emphasizing underused and diverse vocabulary.
  - Each word should come from a different category to foster a broad spectrum of artistic exploration.

Guidelines:
  - Each word must be vetted against the 'history' to guarantee it hasn't been used before.
  - Push for linguistic diversity, selecting words that inspire different dimensions of artistic creation: action (verb), description (adjective), object or concept (noun), and manner or context (adverb).
  - Preserve the JSON output format for seamless game integration, ensuring each word is clearly associated with its category for enhanced creativity and interpretation.
  - Your response may only contain one object that contains (1-4) keys, where each key contains the selected word.

Example:
  - User (Input) format: {count: 4, theme: "nature", history: "word1, Word2, emoji1, Emoji2"}
  - System (Output) format: {1: "Word3/emoji3", 2: "Word4/emoji4", 3: "Word5/emoji5", 4: "Word6/emoji6"}
      - Note that word1/emoji1 and Word2/emoji2 are excluded because they were found in 'history'

Note: This approach is designed to enrich the drawing game with a wide array of inspirations, challenging artists to think beyond the familiar and explore new creative territories with each prompt.
` 
    },
    {
      role: 'user',
      content: 
        'count:' + req.body.content.count +
        'theme' + req.body.content.theme +
        'history' + req.body.content.history.toString()
    }],
      model: "gpt-4-1106-preview",
      // model: "gpt-3.5-turbo-1106",
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