const OpenAI = require("openai");

async function challenges(req, res) {
  const openai = new OpenAI();
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ 
        role: "system", 
        content: `System:
- Your function is to create unique coding challenges that are clear, precise, and accurately testable.
- Return a JSON object detailing the challenge, including a unique ID, name, parameters (language, difficulty, length), detailed instructions, hints, test cases, and the solution.
- The ID should uniquely identify the challenge, incorporating aspects of its content to avoid duplicates.
- Challenges should be tailored to the specified skill level and length, with test cases that accurately reflect expected outcomes.
- Provide 3-5 test cases to ensure thorough testing, emphasizing the importance of correctness in expected outputs.
- Instructions should clearly define the task, including naming conventions for functions or classes to be implemented by the user.
- Hints should assist the user in conceptualizing the solution without providing direct code snippets or specific command/method names.
- The optimal solution code provided must meet the challenge criteria and be presented as a model answer. You MUST be 100% certain that your solution meets ALL criteria of the challenge.

Response Template:
  {
    ID: "unique challenge identifier",
    name: "challenge name",
    parameters: {language: "specified language", difficulty: "specified difficulty", length: "expected solution length"},
    challenge: "detailed instructions for the user",
    textHints: ["general hints to guide the user", "additional hints"],
    codeHints: ["code-specific hints to nudge towards the solution"],
    testCases: [["input", "expected output"], ["input", "expected output"]],
    solution: "optimal solution code, must meet all challenge requirements"
  }
           
        `
      },
      {
        role: 'user',
        content: `ID: ${req.body.content.id}, Language: ${req.body.content.language}, Difficulty: ${req.body.content.difficulty}, Length: ${req.body.content.length}, Request: ${req.body.content.request}`
      }],
      model: "gpt-4-1106-preview",
      response_format: { "type": "json_object" }
    });

    res.status(200).json({ response: completion.choices[0].message.content });
    

    // res.status(200).json({ response: {
    //   ID: 'py_beg_short_find_max_number',
    //   challenge: 'Write a function that takes a list of numbers and returns the maximum number in the list.',
    //   textHints: [
    //     'Consider looping through the list and keeping track of the maximum value seen so far.',
    //     'You can initialize the maximum value as the first element in the list and then compare it with the rest of the elements in the list.'
    //   ],
    //   codeHints: [
    //     'You can use the built-in max() function to find the maximum number in a list.'
    //   ],
    //   testCases: [
    //     'Test the function with an empty list, a list with only one element, and a list with multiple elements to ensure the function works correctly in all cases.'
    //   ],
    //   Solution: 'def find_max_number(numbers):\n' +
    //     '    if not numbers:\n' +
    //     '        return None\n' +
    //     '    max_num = numbers[0]\n' +
    //     '    for num in numbers:\n' +
    //     '        if num > max_num:\n' +
    //     '            max_num = num\n' +
    //     '    return max_num'
    // }})
  } catch (err) {
    res.status(400).json({ err: err.message });
  }

}

module.exports = {
  challenges,
};