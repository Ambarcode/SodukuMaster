import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  function handleSigninClick(e) {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;
    const q = query(collection(db, "users"), where("email", "==", email));
    getDocs(q).then((querySnapshot) => {
      if (querySnapshot.size === 0) {
        setErrorMessage("User does not exist");
      } else {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.isAdmin === true) {
            setErrorMessage("Admin cannot play the game");
          } else {
            signInWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                navigate("/");
              })
              .catch((error) => {
                const errorCode = error.code;
                if (errorCode === "auth/wrong-password") {
                  setErrorMessage("Wrong password");
                }
              });
          }
        });
      }
    });
  }

  function validateEmail(email) {
    const q = query(collection(db, "users"), where("email", "==", email));
    getDocs(q).then((querySnapshot) => {
      if (querySnapshot.size === 0) {
        setErrorMessage("Email not registered");
      } else {
        setErrorMessage("");
      }
    });
  }

  function validatePassword(pass) {
    if (pass.length < 6)
      setErrorMessage("Password needs to be atleast 6 characters long");
    else setErrorMessage("");
  }

  return (
    <div className="flex flex-col items-center justify-center py-2 bg-gray-100">
      <div className="flex h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white rounded-md shadow-md">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
            Sign in to play
          </h2>
          <form className="space-y-6" onSubmit={handleSigninClick}>
            {errorMessage && (
              <label htmlFor="email" className="block text-sm font-medium text-red-500">
                {errorMessage}
              </label>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={(e) => validateEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={(e) => validatePassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Start the game
              </button>
            </div>
          </form>
          <p className="mt-6 text-center text-base text-gray-500">
            New User?{" "}
            <Link to={`/signup`}>
              <span className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign Up
              </span>
            </Link>
          </p>
          <p className="mt-1 text-center text-base text-gray-500">
            Admin?{" "}
            <Link to={`/adminLogin`}>
              <span className="font-medium text-indigo-600 hover:text-indigo-500">
                Admin Login
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
  
}
