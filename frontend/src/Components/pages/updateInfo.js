// import { useState, useContext } from "react";
// import { Navigate } from "react-router-dom";
// import {UserContext} from '../../context/UserContext';
// import Cookies from 'js-cookie';

// async function Update(){
//     // const [username, setUsername] = useState('');
//     // const [password, setPassword] = useState('');
//     // const [redirect, setRedirect] = useState(false);
//     // // const {setUserInfo} = useContext(UserContext);
//     // async function update(ev){
//     //     ev.preventDefault();
//     //     const resp = await fetch('http://localhost:5000/login', {
//     //         method: "POST",
//     //         body: JSON.stringify({username, password}),
//     //         headers: { "Content-Type": "application/json" },
//     //         // credentials: 'include',
//     //     }); 
//     //     if(resp.ok){
//     //         let data = await resp.json()
//     //           console.log("data", data)
//     //         Cookies.set('token', data.username, { expires: 7 });
//     //           setRedirect(true);
//     //     }else{
//     //       alert('Invalid Credentials')
//     //     }
//     // }
//     // if(redirect){
//     //     return <Navigate to= {`/dashboard`} replace={true} />
//     // }

//     return (
//        <div className="container">
//     <div className="row justify-content-center mt-5">
//       <div className="col-md-6">
//         <div className="card border-0 shadow-lg">
//           <div className="card-header bg-primary text-white text-center">
//             <h3>Login</h3>
//           </div>
//           <div className="card-body">
//             <form>
//               <div className="mb-3">
//                 <label htmlFor="username" className="form-label">Email</label>
//                 <input type="text" className="form-control" id="email" placeholder="Enter your email" />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="password" className="form-label">Password</label>
//                 <input type="password" className="form-control" id="password" placeholder="Enter your password" />
//               </div>
//               <div className="d-grid gap-2">
//                 <button type="submit" className="btn btn-primary">Login</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>

//     );
// }

// export default Update

import { useState } from "react";
import { Navigate } from "react-router-dom";

function UpdatePage() {
  const [username, setUsername] = useState("");
  const [username1, setUsername1] = useState("");

  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  // const [year, setYear] = useState(years[0]);
  const [redirect, setRedirect] = useState(false);

  async function update(ev) {
    ev.preventDefault();
    const response = await fetch("http://localhost:5000/update-info", {
      method: "POST",
      body: JSON.stringify({username, username1, name, password}),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      console.log({response}) 
      console.log("Update successful! Please login");
      setRedirect(true);
    } else {
      alert("Information could not be updated.");
    }
  }
  if(redirect){
    return <Navigate to= {`/login`} replace={true} />
  }
  return (
    <div className="container">
    <div className="row justify-content-center mt-5">
      <div className="col-md-6">
        <div className="card border-0 shadow-lg">
          <div className="card-header bg-primary text-white text-center">
            <h3>Update Information</h3>
          </div>
          <div className="card-body">
            <form>
              <div className="mb-3">
              <div className="mb-3">
                <label htmlFor="username" className="form-label"> Present Username</label>
                <input type="text" className="form-control" id="username" placeholder="Enter your present username" value = {username} onChange = {ev => setUsername(ev.target.value)}/>
              </div>
              <div className="mb-3">
                <label htmlFor="username" className="form-label"> New Username</label>
                <input type="text" className="form-control" id="username1" placeholder="Enter your new username" value = {username1} onChange = {ev => setUsername1(ev.target.value)}/>
              </div>
                <label htmlFor="username" className="form-label">New Name</label>
                <input type="text" className="form-control" id="name" placeholder="Enter your updated name" value = {name} onChange = {ev => setName(ev.target.value)}/>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">New Password</label>
                <input type="password" className="form-control" id="password" placeholder="Enter your new password" value = {password} onChange = {ev => setPassword(ev.target.value)}/>
              </div>
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary" onClick={update}>Update</button>
              </div>
            </form>
          </div>
          <div className="card-footer text-center">
            <small><a href="/login">Click here to Login</a></small>
          </div>
        </div>
      </div>
    </div>
  </div>

  );
}

export default UpdatePage;