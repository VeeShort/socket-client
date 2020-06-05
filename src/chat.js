export default class Chat {
  chat;

  constructor() {
    this.chat = document.getElementById('chat');
    document.querySelector('input[type="text"]').focus();
  }

  /**
   * Scroll to bottom of the chat
   */
  scrollToBottom() {
    this.chat.scrollTo(0, this.chat.scrollHeight);
  }

  /**
   * Creates element for chat with message text
   * @param {string} msg text content of the message
   * @param {string} type message type, defines the formating of the message in chat box
   */
  displayMessage(msg, username = '', color = '#fff', type = 'text') {
    if (this.chat) {
      const messageContainer = document.createElement('div');
      messageContainer.className = 'message-container';

      const message = document.createElement('span');
      message.className = 'message';

      const usernameEl = document.createElement('span');
      usernameEl.className = 'username';

      const colorBubble = document.createElement('span');
      colorBubble.className = 'user-color';
      colorBubble.style.backgroundColor = color;

      const usernameContainer = document.createElement('div');
      usernameContainer.className = 'username-container';
      usernameContainer.appendChild(colorBubble);
      usernameContainer.appendChild(usernameEl);

      messageContainer.appendChild(usernameContainer);
      messageContainer.appendChild(message);
      switch (type) {
        case 'sys':
          messageContainer.classList.add('sys');
        break;
        default:
      }
      usernameEl.textContent = username;
      message.textContent = msg;
      this.chat.appendChild(messageContainer);
      this.scrollToBottom();
    }
  }

  displayAllConnectedUsers(userList) {
    if (this.chat) {
      const usersContainer = document.getElementById('users');
      usersContainer.innerHTML = '';
      userList.forEach(user => {
        const userItemEl = document.createElement('span');
        const colorBubble = document.createElement('span');
        const username = document.createElement('span');
        userItemEl.className = 'user-item';
        colorBubble.className = 'user-color';
        username.className = 'user-name';
        username.textContent = user.username;
        colorBubble.style.backgroundColor = user.color || '#fff';
        userItemEl.appendChild(colorBubble);
        userItemEl.appendChild(username);
        usersContainer.appendChild(userItemEl);
      });
    }
  }
};