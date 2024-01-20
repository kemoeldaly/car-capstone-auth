// firebase.js

import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyADR68iwtwxtCHxEUSj5DzkpW_5k90EIVk",
  authDomain: "vehicle-capstone.firebaseapp.com",
  projectId: "vehicle-capstone",
  storageBucket: "vehicle-capstone.appspot.com",
  messagingSenderId: "102293584203",
  appId: "1:102293584203:web:97f42b4d06acb73da150ce"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
