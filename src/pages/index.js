import React, { useRef, useEffect } from 'react';

const HolidayChaloAI = () => {
  const chatOutputRef = useRef(null);


  // Fetch data from OpenAI API
  const fetchChatData = async (userInput) => {
    const apiKey = ''; // Replace with your actual API key
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
      max_tokens: 2000,
      presence_penalty: 0.0,
      frequency_penalty:0.0,
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
      chatOutput.innerHTML += `<div class="formOutput"><strong>USER:</strong> ${output}</div>`;
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
    //
    updateChatOutput(chatResponse, false);

    // Reset user input
    event.target.userInput.value = '';
  };

  // useEffect(() => {
  //   // Display initial message in chat output
  //   updateChatOutput('Hello! I am Holiday Socho AI. How can I assist you?', true);
  // }, []);

  return (
    <div>
      <h1>Holiday Chalo AI (3.5)</h1>
      <h2 style={{ textAlign: 'center' }}> Qury To Run :- </h2>
      <h2 style={{ textAlign: 'center' }}>
     
      Please form a JSON format file for a [3 Days] [adventurous] trip to [Bangkok, Thailand] with budget of [16000 INR]having only details as described after this.
Day as 'Day DD' fromat labeled as day, under that store all the sub detailed under label schedule, i.e. hourly time as 'hh:mm AM/PM' fromat labeled as time,
activity location labeled as location, describing activity labeled as activity, mode of transportation to reach the destination labeled as transport,
highlighted tips for that location labeled as highlight, local insights and tips of that location labeled as local_insights; label all these details under label trip_details.
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

          h2 {
text-align: center;
}

#chatContainer {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
      }

      #chatOutput {
        width: 100%;
        max-height: 400px;
        overflow-y: auto;
        border: 1px solid #ccc;
        padding: 10px;
      }

      table {
        width: 100%;
        border-collapse: collapse;
      }

      th,
      td {
        text-align: left;
        padding: 8px;
        border-bottom: 1px solid #ddd;
      }

      th {
        font-weight: bold;
      }

      form {
        margin-top: 10px;
        display: flex;
      }

      input[type='text'] {
        flex: 1;
        padding: 10px;
      }

      button[type='submit'] {
        padding: 10px;
        background-color: #007bff;
        color: #fff;
        border: none;
        cursor: pointer;
      }

      .formOutput {
        margin-top: 10px;
        font-weight: bold;
        color:#000000;
      }
    `}
  </style>
    </div>
  );
};



export default HolidayChaloAI;

