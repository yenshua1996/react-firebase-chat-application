//Initializing App
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// Authentication
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import "firebase/auth";
import "firebase/firestore";
//Hook
import { useState, useEffect } from "react";
// Component
import Button from "./Button";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyAZT9xpKrddNstiqw0R4SahHItfCjJkmFY",
  authDomain: "react-chat-application-bc15b.firebaseapp.com",
  projectId: "react-chat-application-bc15b",
  storageBucket: "react-chat-application-bc15b.appspot.com",
  messagingSenderId: "329876164154",
  appId: "1:329876164154:web:f39b7a19e5eb65691aef03",
  measurementId: "G-CCVH0QFKBC",
};

//Initialize firebase application
const app = initializeApp(firebaseConfig);
//Get analytics
const analytics = getAnalytics(app);

//App component
const App = () => {
  // Instantial GoogleAuthProvider class
  const provider = new GoogleAuthProvider();
  // Call getAuth()
  const auth = getAuth();

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(() => auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }

      if (initializeApp) {
        setInitializing(false);
      }
    });

    return unsubscribe;
  }, [initializing]);

  //Signing-in
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider).then((result) => {
        //Give you Google access token
        const credentials = GoogleAuthProvider.credentialFromResult(result);
        const token = credentials.accessToken;

        //The signed-in user info
        const user = result.user;
      });
    } catch (error) {
      //Handle Error
      const errorCode = error.code;
      const errorMessage = error.message;
      //The emal of the user's account used.
      const email = error.email;
      //The AuthCredential type that was used.
      const credintial = GoogleAuthProvider.credentialFromError(error);
    }
  };

  //Signing-out
  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(user);

  return (
    <div>
      {user ? (
        <>
          <Button onClick={signOut} content={"Sign out"} />{" "}
          <p>Welcome to the Chat!</p>
        </>
      ) : (
        <Button onClick={signInWithGoogle} content={"Sign in with Google"} />
      )}
      <h1>Hello World</h1>
    </div>
  );
};

export default App;
