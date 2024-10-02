/* src/context/AuthContext.js */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success('Successfully logged in!');
    } catch (error) {
      console.error("Error signing in with Google: ", error);
      toast.error('Login failed!');
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success('Successfully logged out!');
    } catch (error) {
      console.error("Error logging out: ", error);
      toast.error('Logout failed!');
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
