// main.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// import { firebaseConfig } from '@/firebase';
import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import Landing from './Landing.vue';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 

createApp(App).mount('#app');
