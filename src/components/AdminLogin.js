import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function AdminLogin() {
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
          if (data.isAdmin === false) {
            setErrorMessage("This is not an admin account");
            return;
          }
        });
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            navigate("/admin/users");
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
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mb-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            ADMIN LOGIN
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-red-900 text-center"
          >
            {errorMessage}
          </label>
          <form className="space-y-6" onSubmit={handleSigninClick}>
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
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-5 text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
          <p className="mt-5 text-center text-sm text-gray-500">
            User?{" "}
            <Link to={`/signin`}>
              <span className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                User Sign in
              </span>
            </Link>
            /{" "}
            <Link to={`/signup`}>
              <span className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                User Sign up
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );

}
