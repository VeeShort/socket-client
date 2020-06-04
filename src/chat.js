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
  displayMessage(msg, username = '', type = 'text') {
    if (this.chat) {
      const messageContainer = document.createElement('div');
      const message = document.createElement('span');
      const usernameEl = document.createElement('div');
      messageContainer.className = 'message-container';
      message.className = 'message';
      usernameEl.className = 'username';
      messageContainer.appendChild(usernameEl);
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
};