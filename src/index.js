import Chat from './chat.js';

const SERVER_ADDRESS_LOCAL = 'http://localhost:3000';
const SERVER_ADDRESS_PROD = 'https://dry-peak-10770.herokuapp.com/';
const client = io.connect(SERVER_ADDRESS_PROD);

const chat = new Chat();

const username = prompt('Enter your name');

const inputEl = document.getElementById('msg-input');
const sendBtn = document.getElementById('send-btn');

let userId;

if (username) {
  client.emit('user:joinRequest', username);
}

const sendMessage = () => {
  const message = inputEl.value;
  inputEl.value = '';
  if (message && message.trim() !== '') {
    // send message to server
    client.emit('user:message', {
      username,
      message
    });
  }
}

if (sendBtn) {
  sendBtn.onclick = sendMessage;
}
if (inputEl) {
  inputEl.onkeypress = (event) => {
    if (event.which == 13 || event.keyCode == 13) {
      sendMessage();
      return false;
    }
    return true;
  };
}

client.on('user:connection', id => {
  userId = id;
});

client.on('user:joinSuccess', (username) => {
  chat.displayMessage('has joined the chat', username, 'sys');
});

client.on('user:exitSuccess', (username) => {
  chat.displayMessage('has left the chat', username, 'sys');
});

client.on('user:message', ({ username, message }) => {
  chat.displayMessage(message, username);
});