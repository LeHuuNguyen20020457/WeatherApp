// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyB8QZZYh70QQPBxIAKgfsVnMoLK1NkRj_s',
    authDomain: 'weather-app-c1a70.firebaseapp.com',
    projectId: 'weather-app-c1a70',
    storageBucket: 'weather-app-c1a70.appspot.com',
    messagingSenderId: '1031423321656',
    appId: '1:1031423321656:web:f773cc191f7fc6b93428cd',
    measurementId: 'G-W2LNNN88BZ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
