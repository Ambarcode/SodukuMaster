import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { db } from "../firebaseConfig";
import { collection, query, getDocs } from "firebase/firestore";

export default function AdminAnalytics() {
  const [barData, updateBarData] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    //Get users data from database
    const q = query(collection(db, "users"));
    let newUserData = [...barData];
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.isAdmin === false && data.bestTime !== -1) {
          let time = data.bestTime;
          if (time < 60) {
            newUserData[0]++;
          } else if (time < 300) {
            newUserData[1]++;
          } else if (time < 600) {
            newUserData[2]++;
          } else if (time < 1800) {
            newUserData[3]++;
          } else {
            newUserData[4]++;
          }
        }
      });
      updateBarData(newUserData);
    });
  }, []);

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
          <Bar
            data={{
              labels: [
                "<1min",
                "1min - 5min",
                "5min - 10min",
                "10min - 30min",
                ">30min",
              ],
              datasets: [
                {
                  label: "Users Database",
                  data: barData,
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(255, 205, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(201, 203, 207, 0.2)",
                  ],
                  borderColor: [
                    "rgb(255, 99, 132)",
                    "rgb(255, 159, 64)",
                    "rgb(255, 205, 86)",
                    "rgb(75, 192, 192)",
                    "rgb(54, 162, 235)",
                    "rgb(153, 102, 255)",
                    "rgb(201, 203, 207)",
                  ],
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              scales: {
                y: {
                  title: {
                    display: true,
                    text: "Number of users",
                    color: "white",
                    font: {
                      size: 10,
                    },
                  },
                },
                x: {
                  title: {
                    display: true,
                    text: "Time taken to complete the puzzle",
                    color: "white",
                    font: {
                      size: 10,
                    },
                  },
                },
              },
            }}
          />
          <p className="font-bold mt-8 mb-32">
            Bar plot for Number of users VS Time taken to Complete the puzzle
          </p>
          {/* Reduce the size of pie chart */}
          <Pie
            data={{
              labels: [
                "<1min",
                "1min - 5min",
                "5min - 10min",
                "10min - 30min",
                ">30min",
              ],
              datasets: [
                {
                  label: "Users Database",
                  data: barData,
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.8)",
                    "rgba(255, 159, 64, 0.8)",
                    "rgba(255, 205, 86, 0.8)",
                    "rgba(75, 192, 192, 0.8)",
                    "rgba(54, 162, 235, 0.8)",
                    "rgba(153, 102, 255, 0.8)",
                    "rgba(201, 203, 207, 0.8)",
                  ],
                  hoverOffset: 4,
                },
              ],
            }}
            options={{
              aspectRatio: 1.75,
              circumference: 360,
              radius: 300,
              cutout: "50%",
            }}
          />
          <p className="font-bold mt-8">
            Pie Chart for Number of users VS Time taken to Complete the puzzle
          </p>
        </div>
      </div>
    </>
  );
}
