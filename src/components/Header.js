import { Link } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export default function Header() {
  const [user, loading] = useAuthState(auth);
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (loading || !user) {
      return;
    }
    const q = query(collection(db, "users"), where("email", "==", user.email));
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        setUserDetails(data);
      });
    });
  }, [loading, user]);

  function handleLogoutClick() {
    signOut(auth)
      .then(() => {
        console.log("Signed out successfully!");
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  return (
    <header className="bg-gray-800 py-6">
      <nav className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/" className="flex items-center">
            <div className="bg-blue-400 rounded-full h-10 w-10 flex items-center justify-center mr-2">
              <span className="text-white text-3xl">Sudoku</span>
            </div>
            <span className="text-3xl font-bold text-white">Master</span>
          </Link>
        </div>
        {user && (
          <div className="flex items-center">
            <div className="mr-4">
              <Link
                to="/profile"
                className="text-white hover:text-gray-400 transition duration-200"
              >
                Profile
              </Link>
            </div>
            <div>
              <a
                href="https://github.com/Ambarcode"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-400 transition duration-200"
              >
                Creator Profile
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
