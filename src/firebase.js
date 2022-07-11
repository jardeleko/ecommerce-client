// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0zcoVB85ZUJgpbfstPgW7sOxF-Ri6D0U",
  authDomain: "ecommerce-shop-82750.firebaseapp.com",
  projectId: "ecommerce-shop-82750",
  storageBucket: "ecommerce-shop-82750.appspot.com",
  messagingSenderId: "649568566282",
  appId: "1:649568566282:web:0a0cd8fef5014dbb18b3f3"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export default app