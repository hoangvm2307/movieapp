import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app/layout/App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router/Routes";
import { Provider } from "react-redux";
import { store } from "./app/store/configureStore";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase();
function writeActorData( name: any, birthdate: any, country: any) {
  const reference = ref(db, "actors");
  const newReference = push(reference)
  set(newReference, {
    name: name,
    birthdate: birthdate,
    country: country,
  });
}
 

const getAllActorsData = () => {
  const actorRef = ref(db, "actors/");
  onValue(actorRef, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const childkey = childSnapshot.key;
      const childData = childSnapshot.val();
      console.log(childkey + " " + childData)
    })
  }, {
    onlyOnce: true
  })
};

getAllActorsData()