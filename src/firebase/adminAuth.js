import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDuasBtK1PvosPex4qpuy38e88LM2HFpwo",
  authDomain: "testreact-firebase.firebaseapp.com",
  databaseURL: "https://testreact-firebase.firebaseio.com",
  projectId: "testreact-firebase",
  storageBucket: "testreact-firebase.appspot.com",
  messagingSenderId: "29470557823",
  appId: "1:29470557823:web:8f83b07deaa711d3bbe14a",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
