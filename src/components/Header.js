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
    if(loading || !user){
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
    <>
      {loading ? (
        <></>
      ) : !user ? (
        <>
          <nav className="container mx-auto flex justify-between items-center">
            <div className="flex items-center flex-shrink-0 mr-6 ml-2">
              <div className="bg-blue-400 rounded-full h-10 w-10 flex items-center justify-center mr-2">
                <span className="text-white text-3xl">Sudoku</span>
              </div>
              <span className="text-3xl font-bold text-white">Puzzle</span>
            </div>
            <div className="flex items-center justify-between flex-wrap">
              <a
                className="btn btn-ghost"
                href="https://github.com/HANS-2002/detective_treasure_elitmus"
                target="_blank"
                rel="noreferrer"
                content="noopener noreferrer"
              >
                SOURCE CODE
              </a>
            </div>
          </nav>
        </>
      ) : (
        <>
          <nav className="flex items-center justify-between flex-wrap text-white bg-zinc-800 p-2">
            <div className="flex items-center flex-shrink-0 mr-6 ml-2">
              <div className="bg-blue-400 rounded-full h-10 w-10 flex items-center justify-center mr-2">
                <span className="text-white text-3xl">Sudoku</span>
              </div>
              <span className="text-3xl font-bold text-white">
                {userDetails.isAdmin ? "Sudoku Puzzle" : <Link to="/">Sudoku Puzzle</Link>}
              </span>
            </div>
            <div className="flex-none gap-2 dropdown dropdown-end dropdown-hover">
              <button className="btn btn-ghost mr-2" onClick={handleLogoutClick}>
                Logout
              </button>
            </div>
          </nav>
        </>
      )}
    </>
  );
  
  
  
  
}
