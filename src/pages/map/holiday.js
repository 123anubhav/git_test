import React, { useRef, useEffect } from 'react';

const HolidayChaloAI = () => {
  const chatOutputRef = useRef(null);

  // Fetch data from OpenAI API
  const fetchChatData = async (userInput) => {
    const apiKey = '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'; // Replace with your actual API key
    const apiUrl = 'https://api.openai.com/v1/chat/completions';
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${apiKey}`);
    headers.append('Content-Type', 'application/json');

    const data = {
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: userInput }
      ],
      model: 'gpt-3.5-turbo',
      max_tokens: 2000
    };

    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    };

    const response = await fetch(apiUrl, requestOptions);
    const responseData = await response.json();
    return responseData.choices[0].message.content;
  };

  // Update chat output
  const updateChatOutput = (output, isFormResponse = false) => {
    const chatOutput = chatOutputRef.current;
    if (isFormResponse) {
      chatOutput.innerHTML += `<div class="formOutput"><strong>Assistant:</strong> ${output}</div>`;
    } else {
      chatOutput.innerHTML += `<p><strong>Holiday Socho AI:</strong> ${output}</p>`;
    }
    // Scroll to bottom of chat output
    chatOutput.scrollTop = chatOutput.scrollHeight;
  };

  // Handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Get user input
    const userInput = event.target.userInput.value;

    // Display user input in chat output
    updateChatOutput(userInput, true);

    // Fetch data from OpenAI API
    const chatResponse = await fetchChatData(userInput);

    // Display chat response in chat output
    updateChatOutput(chatResponse, false);

    // Reset user input
    event.target.userInput.value = '';
  };

  useEffect(() => {
    // Display initial message in chat output
    updateChatOutput('Hello! I am Holiday Socho AI. How can I assist you?', false);
  }, []);

  return (
    <div>
      <h1>Holiday Chalo AI (3.5)</h1>
      <h2 style={{ textAlign: 'center' }}>
        Plan a detailed hourly trip To Manali for 2 days. Make 3 column (Day, Time, Activity) and show the result in
        Tabular Format
      </h2>
      <div id="chatContainer">
        <div id="chatOutput" ref={chatOutputRef}></div>
        <form id="chatForm" onSubmit={handleFormSubmit}>
          <input type="text" id="userInput" name="userInput" autoComplete="off" placeholder="Type your message..." />
          <button type="submit">Send</button>
        </form>
      </div>

      <style jsx>
        {`
          body {
            font-family: Arial, sans-serif;
          }

          h1 {
            text-align: center;
          }

          #chatContainer {
            width: 900px;
            margin: 0 auto;
            background-color: #f8f8f8;
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 20px;
            #chatOutput {
            height: 400px;
            overflow-y: scroll;
            padding: 10px;
            background-color: black;
            {/* background-color: #fff; */}

            border: 1px solid #ddd;
            border-radius: 5px;
            margin-bottom: 10px;
          }

          #chatForm {
            display: flex;
          }

          #chatForm input[type='text'] {
            flex: 1;
            padding: 10px;
            border: none;
            border-radius: 5px;
          }

          #chatForm button {
            padding: 10px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }

          .formOutput {
            margin-bottom: 10px;
            color:#000000;
          }
        `}
      </style>
    </div>
  );
};

export default HolidayChaloAI;

