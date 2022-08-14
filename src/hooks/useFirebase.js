import firebaseInIt from '../firebase/firebase.init';
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
firebaseInIt();
const auth = getAuth();

const useFirebase = () => {
  const [dbUsers, setdbUsers] = useState({});
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  //finding dbusers
  useEffect(() => {
    fetch('http://localhost:5001/users')
      .then((res) => res.json())
      .then((data) => setdbUsers(data));
  }, []);

  //new for test
  //google sign in test
  const handleGoogleSignIn = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, provider);
  };

  //google register
  function googleRegister({ history, redirect }) {
    setLoading(true);
    handleGoogleSignIn()
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
        const email = user.email;
        const name = user.displayName;
        console.log(user, email, name);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Successfully Logged in!!',
          text: 'Welcome Back to Baundule',
          showConfirmButton: false,
          timer: 2000,
        });
        setUser(result.user);
        setUserName(name);
        addUserToDB(name, email);
        console.log(user);
        history.replace(redirect);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Oops..',
          text: `${error.message}`,
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  //register
  function UserRegister(newUserData, history) {
    const { name, email, password } = newUserData;
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setUserName(name);
        addUserToDB(name, email);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Successfully Registered',
          text: 'Welcome to Baundule',
          showConfirmButton: false,
          timer: 2000,
        });
        setUser(result.user);
        history.replace('/');
      })
      .catch((err) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Oops..',
          text: `${err.message}`,
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .finally(() => setLoading(false));
  }
  // add user to db
  function addUserToDB(name, email) {
    const matchedUser = dbUsers.find(
      (existingUser) => existingUser.email === email
    );
    if (!matchedUser) {
      fetch('http://localhost:5001/users', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, email }),
      })
        .then((res) => res.json())
        .then((data) => {});
    } else {
      return;
    }
  }

  // set username
  function setUserName(name) {
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {})
      .catch((error) => {});
  }

  // Get the currently signed-in user

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
      setLoading(false);
    });
    return () => unsubscribed;
  }, []);

  // login
  function userLogin({ email, password, history, redirect }) {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Successfully Logged in!!',
          text: 'Welcome Back to Baundule',
          showConfirmButton: false,
          timer: 2000,
        });
        setUser(result.user);
        history.replace(redirect);
      })
      .catch((err) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Oops..',
          text: `${err.message}`,
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .finally(() => setLoading(false));
  }

  // logout
  function logout() {
    setLoading(true);
    signOut(auth)
      .then(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Successfully Logged out!',
          text: 'See You Soon',
          showConfirmButton: false,
          timer: 2000,
        });
        setUser({});
      })
      .catch((err) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Oops..',
          text: `${err.message}`,
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .finally(() => setLoading(false));
  }

  return {
    UserRegister,
    ...user,
    loading,
    handleGoogleSignIn,
    userLogin,
    logout,
    setLoading,
    googleRegister,
  };
};

export default useFirebase;

//user is added in last, if problem occurs it can be occurs from return "User"
