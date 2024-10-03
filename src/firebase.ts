import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBxjBNGvKx_6Rl6OZtbkPbVYYt3g7bkUYA",
  authDomain: "team-task-management-app-1e5c1.firebaseapp.com",
  projectId: "team-task-management-app-1e5c1",
  storageBucket: "team-task-management-app-1e5c1.appspot.com",
  messagingSenderId: "1098133558376",
  appId: "1:1098133558376:web:9f0f0b0e9b0b0b0b0b0b0b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;