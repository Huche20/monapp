import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth';
// Optionally import the services that you want to use

// import {...} from 'firebase/database';
// import {...} from 'firebase/firestore';
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBn3G80NW8ZZchJ4LmShOCypV5uPlieq80",
  authDomain: "monapp-b70d3.firebaseapp.com",
  projectId: "monapp-b70d3",
  storageBucket: "monapp-b70d3.firebasestorage.app",
  messagingSenderId: "786982462122",
  appId: "1:786982462122:web:d821699ac747f83977a6d3"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

export {  auth };
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
