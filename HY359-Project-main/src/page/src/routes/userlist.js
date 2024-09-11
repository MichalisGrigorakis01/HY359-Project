import React,{ useState,useEffect } from 'react';
import axios from 'axios';

function Userlist({item}) {
  
    const handleclick = (event) => {
        axios.post('http://localhost:3001/admin/deletion',{
            username:item.username
        }).then(function (response) {
        console.log(response.data);
      })
      
      };
      
    return (
        <div>
          <label>
            {item.firstname}     {item.lastname}     {item.username} <button onClick={handleclick}>Delete</button> 
          </label>
        </div>
      )
}

export default Userlist;