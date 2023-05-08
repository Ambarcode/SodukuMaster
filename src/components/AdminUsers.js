import { Link } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function AdminUsers() {
  const [userData, updateUserData] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "users"), orderBy("bestTime"));
    let newUserData = [...userData];
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.isAdmin === false) {
          let date = new Date(parseInt(data.startTime.seconds * 1000)).toUTCString();
          let userSinceDate = new Date(parseInt(data.userSince.seconds * 1000)).toUTCString();
          newUserData.push({
            username: data.username,
            email: data.email,
            lastGameStart: date,
            userSince: userSinceDate,
            bestSolveTime: data.bestTime,
          });
        }
      });
      console.log(newUserData);
      updateUserData(newUserData);
    });
  }, []);

  function transformTime(time) {
    if(time === -1) return "N/A";
    let hr = Math.floor(time / 3600);
    let min = Math.floor((time - hr * 3600) / 60);
    let sec = time - hr * 3600 - min * 60;
    return `${hr < 10 ? "0" + hr : hr} hr ${min < 10 ? "0" + min : min} min ${
      sec < 10 ? "0" + sec : sec
    } sec`;
  }

  return (
    <>
      <div className="flex flex-row mainDiv">
        <div className="flex flex-col w-1/5 p-4 items-center border-white border-r-2">
          <p className="font-bold text-3xl text-red-500">Admin Panel</p>
          <Link to="/admin/users" className="mt-16 mb-2 font-bold text-xl">
            Users
          </Link>
          <Link to="/admin/analytics" className="mt-8 mb-4 font-bold text-xl">
            Analytics
          </Link>
        </div>
        <div className="flex flex-col w-4/5 p-4 items-center">
          <div className="overflow-x-auto">
            {userData.length > 0 ? (
              <table className="table w-full">
                <thead>
                  <tr>
                    <th></th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>User Since</th>
                    <th>Last Game Start</th>
                    <th>Best Solve TIme</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.map((user, index) => {
                    return (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.userSince}</td>
                        <td>{user.lastGameStart}</td>
                        <td>{transformTime(user.bestSolveTime)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
