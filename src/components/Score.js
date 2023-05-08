import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  query,
  getDocs,
  orderBy,
  limit,
  where,
} from "firebase/firestore";

export default function Score(props) {
  const email = props.email;
  const [users, setUsers] = useState([]);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const q1 = query(collection(db, "users"), where("email", "==", email));
    getDocs(q1).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        setUserDetails(data);
      });
    });

    const q = query(
      collection(db, "users"),
      where("bestTime", "!=", -1),
      orderBy("bestTime"),
      limit(8)
    );

    getDocs(q).then((querySnapshot) => {
      let newData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.isAdmin === true) return;
        newData.push({
          username: data.username,
          bestTime: data.bestTime,
        });
      });
      setUsers(newData);
    });
  }, [email]);

  function transformTime(time) {
    let hr = Math.floor(time / 3600);
    let min = Math.floor((time - hr * 3600) / 60);
    let sec = time - hr * 3600 - min * 60;
    return `${hr < 10 ? "0" + hr : hr} hr ${min < 10 ? "0" + min : min} min ${
      sec < 10 ? "0" + sec : sec
    } sec`;
  }

  return (
    <>
      <p className="mb-4">
        <span className="font-bold text-gray-800">Username: {userDetails.username}</span>
      </p>
      <div className="mb-4 bg-gray-200 rounded-lg p-4">
        <p className="font-bold text-center mt-4 mb-2 text-red-500 text-lg">Global Leaderboard</p>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-gray-700">Username</th>
              <th className="px-4 py-2 text-gray-700">Best Time</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={index}>
                  <td className="border px-4 py-2 text-gray-700">{user.username}</td>
                  <td className="border px-4 py-2 text-gray-700">
                    {transformTime(user.bestTime)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
