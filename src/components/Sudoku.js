import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import axios from "axios";

const styles = {
  container: {
  backgroundColor: "#f2f2f2",
  color: "black",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.2rem",
  },
  sudokuBoard: {
  display: "grid",
  gridTemplateColumns: "repeat(9, 1fr)",
  gridTemplateRows: "repeat(9, 1fr)",
  gridGap: "2px",
  margin: "20px 0",
  },
  cell: {
  backgroundColor: "#e6e6e6",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  fontSize: "1.2rem",
  },
  fixedCell: {
  backgroundColor: "#ddd",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "not-allowed",
  fontSize: "1.2rem",
  },
  selectedCell: {
  backgroundColor: "#c2c2c2",
  },
  button: {
  padding: "10px",
  margin: "10px",
  fontSize: "1.2rem",
  },
  timer: {
  margin: "20px 0",
  color: "#808080",
  },
  };

export default function Sudoku(props) {
  const email = props.email;
  const [sudoku, setSudoku] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const [gameBool, setGameBool] = useState([
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false]
  ]);
  
  const handleClick = (row, col) => {
    const newGameBool = [...gameBool];
    newGameBool[row][col] = !gameBool[row][col];
    setGameBool(newGameBool);
  };
  
  const [userDetails, setUserDetails] = useState({});
  const [time, setTime] = useState(0);
  const [hasWin, setHasWin] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "users"), where("email", "==", email));
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        setUserDetails(data);
        let newSudoku = [];
        let newBoolGame = [];
        for (let i = 1; i <= 9; i++) {
          newSudoku.push(data.savedGame[i]);
          newBoolGame.push(data.gameBool[i]);
        }
        setTime(parseInt(new Date().getTime() / 1000) - data.startTime.seconds);
        let count = 0;
        for (let i = 0; i < 9; i++) {
          for (let j = 0; j < 9; j++) {
            if (newSudoku[i][j] !== 0) {
              count++;
            }
          }
        }
        if (count === 0) {
          axios
            .get("https://sugoku.onrender.com/board?difficulty=easy")
            .then((response) => {
              let board = response.data.board;
              setSudoku(board);
              let newBoolGame = [];
              for (let i = 0; i < 9; i++) {
                let row = [];
                for (let j = 0; j < 9; j++) {
                  if (board[i][j] !== 0) {
                    row.push(true);
                  } else {
                    row.push(false);
                  }
                }
                newBoolGame.push(row);
              }
              setGameBool(newBoolGame);
            });
          setSudoku(newSudoku);
        } else {
          setSudoku(newSudoku);
          setGameBool(newBoolGame);
        }
      });
    });
  }, [email]);

  function saveSudoku(sudokuBoard, GameBool) {
    let savedGame = {};
    let savedgameBool = {};
    for (let i = 1; i <= 9; i++) {
      savedGame[i] = sudokuBoard[i - 1];
      savedgameBool[i] = GameBool[i - 1];
    }
    const q = query(collection(db, "users"), where("email", "==", email));
    const storeData = {
      savedGame: savedGame,
      gameBool: savedgameBool,
      startTime: Timestamp.now(),
    };
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        setUserDetails(data);
        updateDoc(doc.ref, storeData);
      });
    });
  }

  function sudokuWinnerChecker() {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (sudoku[i][j] === 0) {
          return false;
        }
      }
    }
    for (let i = 0; i < 9; i++) {
      let row = new Set();
      let col = new Set();
      for (let j = 0; j < 9; j++) {
        row.add(sudoku[i][j]);
        col.add(sudoku[j][i]);
      }
      if (row.size !== 9 || col.size !== 9) {
        return false;
      }
    }
    for (let i = 0; i < 9; i += 3) {
      for (let j = 0; j < 9; j += 3) {
        let block = new Set();
        for (let k = i; k < i + 3; k++) {
          for (let l = j; l < j + 3; l++) {
            block.add(sudoku[k][l]);
          }
        }
        if (block.size !== 9) {
          return false;
        }
      }
    }
    if (userDetails.bestTime === -1 || time < userDetails.bestTime) {
      const q = query(collection(db, "users"), where("email", "==", email));
      getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          setUserDetails(data);
          updateDoc(doc.ref, {
            bestTime: time,
          });
        });
      });
    }
    return true;
  }

  function resetSudoku() {
    let newSudoku = [];
    let newBoolGame = [];
    axios
      .get("https://sugoku.onrender.com/board?difficulty=easy")
      .then((response) => {
        let board = response.data.board;
        newSudoku = board;
        setSudoku(board);
        for (let i = 0; i < 9; i++) {
          let row = [];
          for (let j = 0; j < 9; j++) {
            if (board[i][j] !== 0) {
              row.push(true);
            } else {
              row.push(false);
            }
          }
          newBoolGame.push(row);
        }
        saveSudoku(newSudoku, newBoolGame, null);
        setGameBool(newBoolGame);
        setTime(0);
        setHasWin(false);
      });
  }

  useEffect(() => {
    if (!hasWin) {
      const interval = setInterval(() => setTime(time + 1), 1000);
      return () => clearInterval(interval);
    }
  }, [time, hasWin]);

  function transformTime(time) {
    let hr = Math.floor(time / 3600);
    let min = Math.floor((time - hr * 3600) / 60);
    let sec = time - hr * 3600 - min * 60;
    return `${hr < 10 ? "0" + hr : hr} hr ${min < 10 ? "0" + min : min} min ${
      sec < 10 ? "0" + sec : sec
    } sec`;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      {hasWin ? (
        <h1 className="text-2xl font-bold mb-4">
          You have finished the puzzle!
        </h1>
      ) : null}
    <p className="mb-4 text-black">
  <span className="font-bold">Current Time: </span>
  {transformTime(time)}
</p>
<p className="mb-4 text-black">
  <span className="font-bold">Best Time: </span>
  {userDetails.bestTime === -1 ? "None" : transformTime(userDetails.bestTime)}
</p>
      <div className="flex flex-col mt-4 mb-4">
        {sudoku.map((row, i) => {
          return (
            <div key={i} className="flex flex-row">
              {row.map((cell, j) => {
                return (
                  <input
                    key={i * 9 + j}
                    className={`
                      ${i % 3 === 2 && i !== 8 ? "border-b-2" : ""} 
                      ${j % 3 === 2 && j !== 8 ? "border-r-2" : ""}
                      ${gameBool[i][j] ? "text-red-300" : "text-lime-300"}
                      border
                      border-gray-300 p-2 m-0 w-8 h-8 text-center caret-transparent hover:cursor-pointer
                    `}
                    type="text"
                    maxLength={1}
                    onKeyDown={(e) => {
                      if (gameBool[i][j]) return;
                      const key = e.key;
                      if (key === "Backspace") {
                        e.target.value = "";
                        let sudokuBoard = sudoku;
                        sudokuBoard[i][j] = 0;
                        saveSudoku(sudokuBoard, gameBool);
                        setSudoku(sudokuBoard);
                      } else if (key >= 1 && key <= 9) {
                        e.target.value = key;
                        let sudokuBoard = sudoku;
                        sudokuBoard[i][j] = parseInt(key);
                        saveSudoku(sudokuBoard, gameBool);
                        setHasWin(sudokuWinnerChecker());
                        setSudoku(sudokuBoard);
                      }
                    }}
                    onChange={(e) => {}}
                    value={cell === 0 ? "" : cell}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="flex flex-row mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
          onClick={resetSudoku}
        >
          {hasWin ? "Play Again" : "Reset"}
        </button>
      </div>
    </div>
  );
  
}
