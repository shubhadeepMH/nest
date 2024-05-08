// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8FMGWthrCadKSvILPHraNyCVOIJrP8Us",
  authDomain: "nest-fffc6.firebaseapp.com",
  projectId: "nest-fffc6",
  storageBucket: "nest-fffc6.appspot.com",
  messagingSenderId: "562281693668",
  appId: "1:562281693668:web:3ccf9577873ee96ec687f1",
  measurementId: "G-0V8W306KTM",
  storageBucket:"gs://nest-fffc6.appspot.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app