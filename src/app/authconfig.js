import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD2wXp9RZy9tYI3Ef5P-9vRWsSkg2XCd90",
    authDomain: "airnavjogpassform.firebaseapp.com",
    projectId: "airnavjogpassform",
    storageBucket: "airnavjogpassform.appspot.com",
    messagingSenderId: "472702397157",
    appId: "1:472702397157:web:b977e138c5c5e9c2e5420c",
    measurementId: "G-1N6TH4QKFK",
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);