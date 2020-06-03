import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCgdw0ItoELuVhpA4GPLGC4YLHflkofLbI",
    authDomain: "fns-app-3d135.firebaseapp.com",
    databaseURL: "https://fns-app-3d135.firebaseio.com",
    projectId: "fns-app-3d135",
    storageBucket: "fns-app-3d135.appspot.com",
    messagingSenderId: "445782095244",
    appId: "1:445782095244:web:c77cb03df94e937a1592a9",
    measurementId: "G-PY5DEDYJ4N"
};

const fire = firebase.initializeApp(firebaseConfig);
export default fire;