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
      chatOutput.innerHTML += `<div class="formOutput"><strong>USER:</strong> ${output}</div>`;
    } else {


var rfv=output;
//var tg=rfv.replace(/Day 1|Day 2|Day 3|Day 4/ig, "");
// var tg=rfv.replace('Day 1','');
// var tg=tg.replace('Day 2','');
// var tg=tg.replace('Day 3','');
// var tg=tg.replace('Day 4','');
// var tg=tg.replace('Day 5','');
// var tg=tg.replace('Day 6','');

var as = rfv.split("|\n|");

var tbs="<table>";


tbs +=`<tr>td><b>: | Day * | *Time | Activity | Transportation | Location Details | Cost |</b></td></tr>`;
for (var j = 0; j < as.length; j++) {


if(as[j].indexOf('Day 1') != -1 || as[j].indexOf('DAY 1') != -1){

tbs +=`<tr><td>Day 1</td></tr>`;


}
else if(as[j].indexOf('Day 2') != -1 || as[j].indexOf('DAY 2') != -1){

tbs +=`<tr><td>Day 2</td></tr>`;


}
else if(as[j].indexOf('Day 3') != -1 || as[j].indexOf('DAY 3') != -1){

tbs +=`<tr><td>Day 3</td></tr>`;


}
else if(as[j].indexOf('Day 4') != -1 || as[j].indexOf('DAY 4') != -1){

tbs +=`<tr><td>Day 4</td></tr>`;


}
else if(as[j].indexOf('Day 5') != -1 || as[j].indexOf('DAY 5') != -1){

tbs +=`<tr><td>Day 5</td></tr>`;


}
else if(as[j].indexOf('Day 6') != -1 || as[j].indexOf('DAY 6') != -1){

tbs +=`<tr><td>Day 6</td></tr>`;


}
else
{
tbs +=`<tr><td>${as[j]}</td></tr>`;

}
//chatOutput.innerHTML += `<p><strong>Holiday Socho sAI:</strong> ${as[j]}</p>`;



}
tbs +=`</table>`;
      chatOutput.innerHTML=tbs;
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

  // useEffect(() => {
  //   // Display initial message in chat output
  //   updateChatOutput('Hello! I am Holiday Socho AI. How can I assist you?', true);
  // }, []);

  return (
    <div>
      <h1>Holiday Chalo AI (3.5)</h1>
      <h2 style={{ textAlign: 'center' }}>
      Please provide a detailed itinerary for a (3-day] trip to [Bangkok, Thailand] that includes recommendations for hotels within a budget of [$200 USD], top-rated local restaurants, must-visit tourist attractions, and [fun activities] to do in the city. The itinerary should be presented in a table format, organized by day and hourly format. Please also suggest the best mode of [transportation (driving/walking/transit/biking)] for each route. Additionally, please provide location details and highlights for each activity or attraction, including any local insights or tips that can help me make the most of my trip.” can you include weather temperature as of today prompt as well but display all in a table format
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
