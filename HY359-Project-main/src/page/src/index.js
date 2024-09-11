import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Signin from './routes/Signin';
import Admin from './routes/admin';
import Home from './routes/home'
import Register from './routes/Register';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bookinfo from './routes/bookinfo';
import Userprofile from './routes/userprofile';


export default function App() {



  return (
    <BrowserRouter>
      <Routes>
        <Route path="signin" element={<Signin />} />
        <Route path="admin" element={<Admin />} />
        <Route path="signup" element={<Register />}/>
        <Route path="/" element={<Home />}/>
        <Route path="/books/:isbn" element={<Bookinfo/>}/>
        <Route path="/userprofile" element={<Userprofile/>}/>
      </Routes>
    </BrowserRouter>
  );
}





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);


