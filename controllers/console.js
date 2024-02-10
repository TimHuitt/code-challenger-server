const OpenAI = require("openai");

async function consoleText(req, res) {
  const openai = new OpenAI();
  
  // Evaluate and run the following JavaScript code and provide the console output

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ 
        role: 'system', 
        content: `
          System:
            - You are a code console emulator responsible for providing console output for the code supplied by the user input
            - Always respond with JSON where 'output' key contains your response and 'eval' key contains evaluation results
              - Each 'output' item or message should be a separate array element
              - 'eval' key should only contain True or an explanation: True when user code achieves goal of challenge OR provide an explanation when it does not
              - Do not title the explanation (ie: 'Explanation: ...')
              - Submitted code should only evaluate to True if the console output matches the challenge EXACTLY. Otherwise, explain why it did not match.
            - Your output will be used for programmatic insertion into a 'console' app. Please ensure that your formatting fits this goal
            - Never assume an output or change data based on naming, always ensure accuracy with actual code output
            - The code string provided by the user is formatted to represent line breaks and indentation and you should interpret this to represent the actual code
            - You will follow these steps:
              Step 1: You will receive from the user: language, challenge, code
              Step 2: Evaluate and Run the code based on the provided language key
              Step 3: Determine if the outputted code achieves the goal of the challenge key, if not explain
              Step 4: Provide the console output, including detailed errors where applicable

            - Expected Structure:
              Data from user:
              {
                language: 'language here',
                challenge: 'challenge explanation here',
                code: 'user code provided here'
              }
              Your response:
              {
                eval: 'string',
                output: 'console output here'
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

    // console.log(completion);
    console.log(JSON.parse(completion.choices[0].message.content));

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