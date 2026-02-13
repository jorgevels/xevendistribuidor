import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

import Loading from "../components/Loading/Loading";

export const AuthContext = createContext({
  currentUser: null,
  loginWithGoogle: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      return user;
    } catch (err) {
      console.error(err);
      throw new Error("Error logging in");
    }
  }

  async function logout() {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loginWithGoogle, logout }}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
}
