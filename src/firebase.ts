import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: 'AIzaSyAXFu2_1VxTdCKHCuMthuo1qO6_zY4dO-k',
  authDomain:' myproject-69f4b.firebaseapp.com',
  projectId: 'myproject-69f4b',
  storageBucket: 'myproject-69f4b.appspot.com',
  messagingSenderId: '89338173500',
  appId: '1:89338173500:web:c1e6bc4868b77e2f73cb39',
}

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export default app
