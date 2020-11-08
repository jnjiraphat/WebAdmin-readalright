import firebase from 'firebase/app';
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyA6-ykf9ZduUIbdsgdsgAuE08pH3SFAo6M",
    authDomain: "readalright.firebaseapp.com",
    databaseURL: "https://readalright.firebaseio.com",
    projectId: "readalright",
    storageBucket: "readalright.appspot.com",
    messagingSenderId: "730744212125",
    appId: "1:730744212125:web:38634bee0504ef94f62274",
    measurementId: "G-0XP8KDX5KW"
  }

  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();
  
  export {storage, firebase as default};