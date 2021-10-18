import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-899ac-default-rtdb.firebaseio.com/',
});

export default instance;
