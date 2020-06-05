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
  document.querySelector('.chat-container').classList.add('visible');
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

client.on('user:connection', ({ id, users }) => {
  userId = id;
});

client.on('sendUsers', users => {
  console.log('users:', users);
  chat.displayAllConnectedUsers(users);
});

client.on('user:joinSuccess', ({ username, color }) => {
  chat.displayMessage('joined', username, color, 'sys');
});

client.on('user:exitSuccess', (username) => {
  chat.displayMessage('left', username, null ,'sys');
});

client.on('user:message', ({ username, message, color }) => {
  chat.displayMessage(message, username, color);
});