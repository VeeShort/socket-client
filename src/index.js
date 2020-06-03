const SERVER_ADDRESS = 'https://dry-peak-10770.herokuapp.com/';
const client = io.connect(SERVER_ADDRESS);
client.on('broadcast', (msg) => {
  console.log('server:', msg);
});
client.on('connection', (msg) => {
  document.querySelector('#status').textContent = msg;
});