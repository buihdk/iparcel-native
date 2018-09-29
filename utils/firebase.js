import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDYHpbMaanm8OSzYAt-3JQ6zaKV1UHKPIc",
  authDomain: "iparcel-a33e0.firebaseapp.com",
  databaseURL: "https://iparcel-a33e0.firebaseio.com",
  projectId: "iparcel-a33e0",
  storageBucket: "iparcel-a33e0.appspot.com",
  messagingSenderId: "992822336983"
};

firebase.initializeApp(config);

export default firebase;