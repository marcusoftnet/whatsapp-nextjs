import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDYepQchrllTX-sWTOHiOG7AC-s2Ses1d0',
  authDomain: 'whatsapp-clone-6eaef.firebaseapp.com',
  projectId: 'whatsapp-clone-6eaef',
  storageBucket: 'whatsapp-clone-6eaef.appspot.com',
  messagingSenderId: '787598958857',
  appId: '1:787598958857:web:f080a6bf1c0dae73b073d8',
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
