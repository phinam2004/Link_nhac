// gpt.js
const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', () => {
  const userMessage = userInput.value;
  appendMessage('Bạn: ' + userMessage);
  userInput.value = '';

  // Gửi yêu cầu chat tới API GPT
  axios.post('https://your-api-endpoint', {
    message: userMessage
  })
  .then(response => {
    const botMessage = response.data.message;
    appendMessage('Bot: ' + botMessage);
  })
  .catch(error => {
    console.error('Lỗi khi gửi yêu cầu chat:', error);
  });
});

function appendMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  chatLog.appendChild(messageElement);
}