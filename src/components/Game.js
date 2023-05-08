import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";
import Sudoku from "./Sudoku";
import Score from "./Score";

export default function Game() {
  const [user, loading] = useAuthState(auth);
  return (
    <div style={{ background: "#808080", height: "100vh" }}>
      {loading ? (
        <></>
      ) : (
        <>
          <div className="flex flex-col lg:flex-row items-center justify-center py-8 px-4 w-screen mainDiv" style={{ background: "#fff", borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}>
            <div className="w-9/12 flex flex-col items-center justify-center">
              <Sudoku email={user.email} />
            </div>
            <div className="w-3/12 flex flex-col items-center justify-center">
              <Score email={user.email} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
