import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, storage } from '../firebase';
import { User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (name: string, photo: File | null) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function login(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function register(email: string, password: string, name: string) {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, { displayName: name });
  }

  function logout() {
    return signOut(auth);
  }

  async function updateUserProfile(name: string, photo: File | null) {
    if (!currentUser) return;

    const updates: { displayName?: string; photoURL?: string } = { displayName: name };

    if (photo) {
      const photoRef = ref(storage, `profilePhotos/${currentUser.uid}`);
      await uploadBytes(photoRef, photo);
      const photoURL = await getDownloadURL(photoRef);
      updates.photoURL = photoURL;
    }

    await updateProfile(currentUser, updates);
    setCurrentUser({ ...currentUser, ...updates });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Add a predefined user for testing
  useEffect(() => {
    const email = "test@example.com";
    const password = "password123";
    const name = "Test User";

    auth.fetchSignInMethodsForEmail(email).then((methods) => {
      if (methods.length === 0) {
        // User doesn't exist, create a new one
        register(email, password, name).then(() => {
          console.log("Test user created successfully");
        }).catch((error) => {
          console.error("Error creating test user:", error);
        });
      } else {
        console.log("Test user already exists");
      }
    }).catch((error) => {
      console.error("Error checking for test user:", error);
    });
  }, []);

  const value = {
    currentUser,
    login,
    register,
    logout,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}