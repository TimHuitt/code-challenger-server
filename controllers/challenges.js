const OpenAI = require("openai");

async function challenges(req, res) {
  const openai = new OpenAI();
  console.log(`ID: ${req.body.content.ID}, Language: ${req.body.content.language}, Difficulty: ${req.body.content.difficulty}, Length: ${req.body.content.length}, Request: ${req.body.content.request}`)
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ 
        role: "system", 
        content: `
        System:
          - You are a personal assistant to a coding challenge app 
          - Your task is to provide a coding challenge based on the provided parameters, using the provided structure
          - Always provide properly formatted JSON
          - Never repeat the provided prompt or it's details
          - ID will be identifying information created and used by the AI to determine if the challenge has already been created
          - You may be presented with the same prompt multiple times, so the ID information MUST be specific to the challenge itself, including specific aspect of the challenge, such as the operation or task, in addition to including the parameters of the prompt ie: py_beg_short_count_vowels; ie: js_int_one-liner_is_even;
          - Do not use the examples provided here as the basis of your challenge unless it is specifically requested in the 'request' field. If no request is given, create a new, unique and unrelated challenge
          - Always provide a unique challenge based on the history provided in the prompt. If a challenge is already present, you should create a new challenge
          - Pay close attention to the 'difficulty'  and 'length' parameters
          - Tailor your challenge to match the requested skill level and expected solution length
          - Challenges with the difficulty of 'beginner' should be EXTREMELY simple
          - Challenges with the difficulty of 'expert' should be VERY difficult and include complex logic
          - If request details are provided, do your best to create a challenge adhering to this request
          - Provide several test cases with the challenge. Accuracy is EXTREMELY important. Evaluate your test case outputs to ensure accuracy of expected output.
          - In your returned JSON, you will add a parameters object that contains the user requested parameters:
          - These parameters must match EXACTLY what the user has requested in user content passed, and must dictate the challenge itself.
          - All challenges should define a function or class name (example: You've created a challenge with ID 'py_beg_short_sum_array', so your instructions would include "Create a function named sumOfArray that...").
          - The challenge 'name' should also be provided in the JSON 'name' field
          - You will be given a prompt in this structure:
            '''
            History: [a list of ID from all previously provided challenges]
            Language: [language name]
            Difficulty: [beginner, intermediate, expert]
            Length: [one-liner, short, medium, long]
            Request: [optional details regarding the created challenge]
            '''
          Your response should strictly follow this structure:
            '''
            {
            ID: "custom identifying information to prevent duplicates",
            name: "name of challenge (should match name of function/class)"
            parameters: {language: "language name", difficulty: "difficulty level", length: "solution length"}
            challenge: "details/instructions of the challenge to be presented to the user",
            textHints: ["Provide 3-5 hints to help the user figure out the solution. These hints should not provide any code specific snippets or references to command names or methods"],
            codeHints: ["Provide 3-5 hints that are code specific and help the user determine the exact code they should be using to solve this problem"],
            testCases: [['input', 'output'], ['input', 'output']],
            solution: "Provide the code for the optimal solution to your challenge.",
            }
            '''    
        `
      },
      {
        role: 'user',
        content: `ID: ${req.body.content.id}, Language: ${req.body.content.language}, Difficulty: ${req.body.content.difficulty}, Length: ${req.body.content.length}, Request: ${req.body.content.request}`
      }],
      model: "gpt-4-1106-preview",
      response_format: { "type": "json_object" }
    });

    // console.log(JSON.parse(completion.choices[0].message.content));

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