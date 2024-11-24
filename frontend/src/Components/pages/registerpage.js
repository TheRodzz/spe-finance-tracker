import { useState } from "react";
import RegisterImage1 from '../images/RegisterImage1.svg'
import logo from '../images/Logo.jpg'
import { Navigate } from "react-router-dom";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  // const [year, setYear] = useState(years[0]);
  const [redirect, setRedirect] = useState(false);

  async function register(ev) {
    ev.preventDefault();
    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      body: JSON.stringify({username, password, name, inchomeTransactions: [], expenseTransactions: []}),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      // console.log({response}) 
      alert("Registration successful! Please login");
      setRedirect(true);
    } else {
      alert("Username in already in use.");
    }
  }
  return (
    <div className="container">
    <div className="row justify-content-center mt-5">
      <div className="col-md-6">
        <div className="card border-0 shadow-lg">
          <div className="card-header bg-primary text-white text-center">
            <h3>Register</h3>
          </div>
          <div className="card-body">
            <form>
              <div className="mb-3">
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" placeholder="Enter your name" value = {name} onChange = {ev => setName(ev.target.value)}/>
              </div>
                <label htmlFor="username" className="form-label">Email</label>
                <input type="text" className="form-control" id="email" placeholder="Enter your email" value = {username} onChange = {ev => setUsername(ev.target.value)}/>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Enter your password" value = {password} onChange = {ev => setPassword(ev.target.value)}/>
              </div>
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary" onClick={register}>Register</button>
              </div>
            </form>
          </div>
          <div className="card-footer text-center">
            <small>Already have an account? <a href="/login">Click here</a></small>
          </div>
        </div>
      </div>
    </div>
  </div>

  );
}

export default RegisterPage;