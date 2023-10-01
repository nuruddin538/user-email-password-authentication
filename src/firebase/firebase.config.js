// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDcsqTBwK0Ukupp90c1uJnPOgzMDLwWz00',
  authDomain: 'user-email-password-auth-649d1.firebaseapp.com',
  projectId: 'user-email-password-auth-649d1',
  storageBucket: 'user-email-password-auth-649d1.appspot.com',
  messagingSenderId: '52467196037',
  appId: '1:52467196037:web:9d5cb71a9438e7cfb0c9ec',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
