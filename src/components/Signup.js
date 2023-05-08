import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  function handleSignupClick(e) {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;
    let username = e.target.username.value;
    // Find an user in the database
    const q = query(collection(db, "users"), where("email", "==", email));
    getDocs(q).then((querySnapshot) => {
      if (querySnapshot.size !== 0) {
        setErrorMessage("Email already in use");
        return;
      } else {
        // Create a new user in the database
        setDoc(doc(db, "users", email), {
          email: email,
          username: username,
          isAdmin: false,
          userSince: Timestamp.now(),
          bestTime: -1,
          startTime: Timestamp.now(),
          savedGame: {
            1: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            2: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            3: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            4: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            5: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            6: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            7: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            8: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            9: [0, 0, 0, 0, 0, 0, 0, 0, 0],
          },
          gameBool: {
            1: [false, false, false, false, false, false, false, false, false],
            2: [false, false, false, false, false, false, false, false, false],
            3: [false, false, false, false, false, false, false, false, false],
            4: [false, false, false, false, false, false, false, false, false],
            5: [false, false, false, false, false, false, false, false, false],
            6: [false, false, false, false, false, false, false, false, false],
            7: [false, false, false, false, false, false, false, false, false],
            8: [false, false, false, false, false, false, false, false, false],
            9: [false, false, false, false, false, false, false, false, false],
          },
        });
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            navigate("/");
          })
          .catch((err) => {
            console.log(err.code);
            console.log(err.message);
          });
      }
    });
  }

  function validateUsername(user_name) {
    const q = query(
      collection(db, "users"),
      where("username", "==", user_name)
    );
    getDocs(q).then((querySnapshot) => {
      if (querySnapshot.size !== 0) {
        setErrorMessage("Username already in use");
      } else {
        setErrorMessage("");
      }
    });
  }

  function validateEmail(email) {
    const q = query(collection(db, "users"), where("email", "==", email));
    getDocs(q).then((querySnapshot) => {
      if (querySnapshot.size !== 0) {
        setErrorMessage("Email already in use");
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
    <div className="bg-white rounded-lg shadow-lg">
      <div className="px-6 py-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mb-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up to start playing
          </h2>
        </div>
  
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-red-900 text-center"
          >
            {errorMessage}
          </label>
          <form className="space-y-6" onSubmit={handleSignupClick}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="username"
                  onChange={(e) => validateUsername(e.target.value)}
                  autoComplete="current-username"
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
  
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={(e) => validateEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
  
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => {
                    validatePassword(e.target.value);
                  }}
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
  
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>
  
          <p className="mt-5 text-center text-sm text-gray-500">
              Already a user?{" "}
              <Link
                to="/signin"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    
  );
}
