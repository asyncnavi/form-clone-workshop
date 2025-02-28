import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { addDoc, collection, getDocs, getFirestore, query, where } from "firebase/firestore";
const config= {
  apiKey: "AIzaSyB2ut_poze-d9Vjf9lferr4-OB409QtSJE",
  authDomain: "g-clone-9b72b.firebaseapp.com",
  projectId: "g-clone-9b72b",
  storageBucket: "g-clone-9b72b.firebasestorage.app",
  messagingSenderId: "550503218579",
  appId: "1:550503218579:web:9e01364db1615b90b37c66",
  measurementId: "G-DBCK69V8Y1"
};
// Firebase App Intilization
export const app = initializeApp(config)
// Firebase Database Initilization
export const db =  getFirestore(app)
// Firebase Auth Initilization
export const auth = getAuth(app)
// Google Provider
const googleProvider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider)
        const user = res.user 

        const q = query(collection(db, "users"), where("uid", "==", user.uid))
        const docs = await getDocs(q)
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            })
        }
    } catch(e) {
        console.log("Firebase Authentication Error", e)
    }
}
export const logout = () => {
    signOut(auth)
}