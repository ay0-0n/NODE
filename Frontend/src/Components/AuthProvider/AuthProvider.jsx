import { createContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword, updateProfile , signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut} from "firebase/auth";
import PropTypes from "prop-types";
import auth from "../../firebase.config";
import axios from 'axios';

export const AuthContext = createContext(null);


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) =>{
        setUser(currentUser);
        setLoading(false);
        const email = {email: currentUser?.email}
        if (currentUser) {
            axios.post('https://node-blogs-lyart.vercel.app/jwt', email, {withCredentials: true})
        } else{
          axios.post('https://node-blogs-lyart.vercel.app/logout', email, {withCredentials: true})
        }
    })
    return () => {
        unSubscribe();
    }
  },[])


  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
  };

  const profileUpdate = (obj) => {
    return updateProfile(auth.currentUser, obj)
  };
 
  const logInWithEmailPass = (email, password, navigate) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/')
      })
  };

  const GoogleProvider = new GoogleAuthProvider();

  const logInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, GoogleProvider)
  };


  const logOut = (navigate) => {
    signOut(auth).then(() => {
        navigate('/login')
      })
  }

  return (
    <AuthContext.Provider
      value={{ user, createUser, logInWithEmailPass, logInWithGoogle, logOut, profileUpdate, loading, setLoading}}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
