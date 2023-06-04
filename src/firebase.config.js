// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCTR0NbKvl-BkRSh_7fpjqU2vusBLl1078",
//   authDomain: "house-market-e61c9.firebaseapp.com",
//   projectId: "house-market-e61c9",
//   storageBucket: "house-market-e61c9.appspot.com",
//   messagingSenderId: "142403101495",
//   appId: "1:142403101495:web:286244ccbe5b75900e30b2",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export const db = getFirestore();

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  // addd your key and configuration details
  apiKey: "AIzaSyBNXFoweo26VYqgCIlBhdS-fTAtqFnv5Rg",
  authDomain: "bikebuddy-001.firebaseapp.com",
  projectId: "bikebuddy-001",
  storageBucket: "bikebuddy-001.appspot.com",
  messagingSenderId: "109676090225",
  appId: "1:109676090225:web:d770850639f0847332dcd0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();
