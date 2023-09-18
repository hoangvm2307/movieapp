import { initializeApp } from "firebase/app";
import { getDatabase} from "firebase/database";
import {getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyCZHCx4BBaGHHni6E3sqvEip8-pee4Y0y4",
  authDomain: "movie-app-5bd52.firebaseapp.com",
  databaseURL: "https://movie-app-5bd52-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "movie-app-5bd52",
  storageBucket: "movie-app-5bd52.appspot.com",
  messagingSenderId: "1006496957876",
  appId: "1:1006496957876:web:9ad793d8edbbcc8bec9ee1",
  measurementId: "G-TY5PNDJ607",
};
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
const database = getDatabase(app);