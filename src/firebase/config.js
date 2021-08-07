import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB8U3I3caizPX-eZJafPf7_td4E4Hng56w',
  authDomain: 'slack-clone-2e868.firebaseapp.com',
  projectId: 'slack-clone-2e868',
  storageBucket: 'slack-clone-2e868.appspot.com',
  messagingSenderId: '79075449847',
  appId: '1:79075449847:web:2f955653279200b646ecf2',
  measurementId: 'G-XB4JWZEC7L',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
