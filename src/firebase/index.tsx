import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';


const firebaseConfig = {
    apiKey: import.meta.env.VITE_GOOGLEFIREBASE,
    authDomain: "bku-chicken.firebaseapp.com",
    projectId: "bku-chicken",
    storageBucket: "bku-chicken.firebasestorage.app",
    messagingSenderId: "454828802774",
    appId: "1:454828802774:web:ed41a5f9065d76edb17f77",
    measurementId: "G-YS8EXKL1D4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
// provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
const messaging = getMessaging(app);

export { auth, provider, signInWithPopup,messaging };

