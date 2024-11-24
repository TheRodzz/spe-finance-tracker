import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import {UserContext} from '../../context/UserContext';
import Cookies from 'js-cookie';
import LoginImage1 from '../images/LoginImage1.svg'
import logo from '../images/Logo.jpg'
import { Link } from "react-router-dom";
// import '../pages/css/loginpage.css'

export default function LoginPage(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    
    const {setUserInfo} = useContext(UserContext);
    async function login(ev){
        ev.preventDefault();
        const resp = await fetch('http://localhost:5000/login', {
            method: "POST",
            body: JSON.stringify({username, password}),
            headers: { "Content-Type": "application/json" },
            // credentials: 'include',
        }); 
        if(resp.ok){
            let data = await resp.json()
              console.log("data", data)
            Cookies.set('token', data.username, { expires: 7 });
              setRedirect(true);
        }else{
          alert('Invalid Credentials')
        }
    }
    if(redirect){
        return <Navigate to= {`/dashboard`} replace={true} />
    }
    return (
       <div className="container">
    <div className="row justify-content-center mt-5">
      <div className="col-md-6">
        <div className="card border-0 shadow-lg">
          <div className="card-header bg-primary text-white text-center">
            <h3>Login</h3>
          </div>
          <div className="card-body">
            <form>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Email</label>
                <input type="text" className="form-control" id="email" placeholder="Enter your email" value = {username} onChange = {ev => setUsername(ev.target.value)}/>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Enter your password" value = {password} onChange = {ev => setPassword(ev.target.value)}/>
              </div>
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary" onClick = {login}>Login</button>
              </div>
            </form>
          </div>
          <div className="card-footer text-center">
            <small>Don't have an account? <a href="/">Sign up here</a></small>
          </div>
        </div>
      </div>
    </div>
  </div>

    );
}