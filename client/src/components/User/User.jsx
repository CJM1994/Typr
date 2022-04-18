import React from "react";

import "./User.scss";

export default function Login() {
  return (
    <section className="user">
      <h1>Accounts</h1>
      <p className="text">Create or log into an account to track your progress across different computers.</p>
      <p className="text"></p>
      <div className="columns">
        <div className="half">
          <h2>Sign-in</h2>
          <div>
            <label>Email:</label><input type="text" name="email" />
            <label>Password:</label><input type="password" />
          </div>
          <button>Login</button>
        </div>
        <div className="half">
          <h2>Register</h2>
          <div>
            <label>Email:</label><input type="text" name="email" />
            <label>Password:</label><input type="password" />
            <label>Confirm:</label><input type="password" />
          </div>
          <button>Register</button>
        </div>
      </div>
    </section>
  )
};