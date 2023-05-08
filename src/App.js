import { auth } from "./firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

import Signin from "./components/Signin";
import Game from "./components/Game";

function App() {
  const [user, loading] = useAuthState(auth);
  return <>{loading ? <></> : !user ? <Signin /> : <Game />}</>;
}

export default App;
