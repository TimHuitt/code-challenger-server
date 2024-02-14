const OpenAI = require("openai");

async function consoleText(req, res) {
  const openai = new OpenAI();
  
  // Evaluate and run the following JavaScript code and provide the console output

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ 
        role: 'system', 
        content: `System:
- Your role is to accurately simulate the output of code snippets provided by users and to evaluate if the user code accomplishes the goal of the challenge.
- Respond with a JSON object where 'output' key contains the simulated console output, and 'eval' key indicates if the code fulfills the specified challenge requirements (true or false).
- Include distinct array elements within 'output' for each piece of console output, error message, or explanation regarding challenge fulfillment.
- 'eval' should be true if the user's code meets the challenge criteria, false otherwise. If false, provide a reason in the 'output'.
- Assume no user interaction for input; focus on the code's functionality based on its static input and logic.
- The output should reflect only the execution results (console output or errors), not the evaluation outcome.
- Code evaluation for 'true' requires exact match with the challenge's expected console output. If mismatched, detail the reasons within 'output' and return 'eval' as false.
- Your feedback will be integrated into a 'console' simulation app, so format your responses accordingly.
- Interpret the provided code string as including line breaks and indentation true to actual code formatting.
- Never require Code execution or demonstration be included in user code. Never comment on a lack of console output or that the provided code does not produce console output.
- To assess if the code is valid, you should formulate several test cases based on the provided challenge requirements. If you find any syntax errors or any test cases fail, you should return 'eval' as false.
- If you output any errors, failures to meet the challenge requirements, failures to evaluate, or language mismatch, 'eval' must return as false
- You will receive several test cases and you are to evaluate and execute each test case against the submitted code. If any part of the challenge is not accomplished, you must return 'eval' as false.
- Process:
  1. Receive user data including: language, challenge description, code snippet, and test cases.
  2. Evaluate and execute the code according to the specified language.
  3. Assess if the code meets the challenge's objectives, setting 'eval' to 'true' or 'false'. Provide explanations for 'false' outcomes in output.
  4. Return the console output or errors clearly in the 'output'.

Response Structure:
  {
    eval: 'true/false',
    output: ['console output here', 'additional messages or errors']
  }   
` 
    },
    {
      role: 'user',
      content: req.body.content
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
  console: consoleText,
};