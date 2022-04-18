import React, { useState, useEffect } from "react";
import axios from "axios";
import './LeaderboardTable.scss';

export default function LeaderboardTable(props) {

  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get(`topUsers`)
      .then((res) => {
        setUsers(res.data);
      });
  }, []);

  return (
    <table>
      <tbody>
        <tr>
          <th>#</th>
          <th>User</th>
          <th>Score</th>
        </tr>
        {users.map((val, key) => {
          return (
            <tr key={key}>
              <td>{key + 1}</td>
              <td>{val.firstName + " " + val.lastName}</td>
              <td>{val.allTimeScore}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

}