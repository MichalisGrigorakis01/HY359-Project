import React,{ useState,useEffect } from 'react';
import axios from 'axios';

function Libraries({library},[isbn]) {

   console.log("hello"+library)
    return (
        <div>
          <label>
           <button onClick={()=>{
              axios.get(`http://localhost:3001/student/${sessionStorage.getItem("user_id")}/${library}/borrow/${isbn}`).then(function (response) {
                console.log(response.data);
              })
            }}>Rent from here?</button> 
          </label>
        </div>
      )
}

export default Libraries;