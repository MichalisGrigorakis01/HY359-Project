import React,{ useState } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

function Signin() {
  
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleChangePass = (event) => {
      setPassword(event.target.value);
  };
  const handleChangeUsername = (event) => {
    setName(event.target.value);
};

  return (
    <div className="login">
      <h1>Please Log In</h1>
      <form>
        <label>
          <p>Username</p>
          <input type="text" onChange={handleChangeUsername}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={handleChangePass}/>
        </label>
        <div>
          <Link to="/">
            <button  onClick={(e)=>{
            axios.post('http://localhost:3001/signin', {
              username: name,
              password: password
            })
            .then(function (response) {
              if(response.data.signin===true){
                 sessionStorage.setItem("username",name);
                 sessionStorage.setItem("usertype",response.data.type);
                 sessionStorage.setItem("user_id",response.data.user_id)
              }
              //if signed in redirect to home page,else back to sign in

            })
            .catch(function (error) {
              console.log(error.response);
            });
          }}>signin</button>
          </Link>
          
          <Link to="/signup">
              <button>signup</button>
            </Link>
          <button type="submit" onClick={(e)=>{
            axios.post('http://localhost:3001/forgotpassword', {
              username: name,
            })
            .then(function (response) {
              console.log(response.data);

            })
          }}>forgot password</button>
        </div>
      </form>
    </div>
  );
  
}

export default Signin;
