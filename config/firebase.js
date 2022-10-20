const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const { getFirestore } = require("firebase/firestore");

const configFirebase = {
    apiKey: "AIzaSyCxudBBxmcDNlOc3k7onOup5_7u-jKEMGQ",
    authDomain: "doeaqui-c778a.firebaseapp.com",
    projectId: "doeaqui-c778a",
    storageBucket: "doeaqui-c778a.appspot.com",
    messagingSenderId: "531424812392",
    appId: "1:531424812392:web:ce076b5aa02585bda64add"
};

const app = initializeApp(configFirebase);
const auth  = getAuth();
const db = getFirestore(app);

module.exports = {
    app,
    auth,
    db
}