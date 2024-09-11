import React,{ useState,useEffect } from 'react';
import axios from 'axios';
import Userlist from './userlist';
import { Chart } from "react-google-charts";

function Admin() {
  
    const [users,setUsers]=useState([])
    let [library,setLibrary]=useState([[]])
    let [genre,setGenre]=useState([[]])
    let [studenttype,setStudenttype]=useState([[]])
    useEffect(() => {axios.get('http://localhost:3001/admin/userlist').then(function (response) {
        console.log(response.data);
        setUsers(response.data)
      })
      axios.get('http://localhost:3001/admin/bookchart').then(function (response) {
        setLibrary(response.data)
      })
      axios.get('http://localhost:3001/admin/genrechart').then(function (response) {
        setGenre(response.data)
      })
      axios.get('http://localhost:3001/admin/studentschart').then(function (response) {
        setStudenttype(response.data)
      })

    }, []);
    console.log(library);
    return([
        users.map(index => {
            return <Userlist item={index} />
          }),<Chart
          chartType="PieChart"
          options={{title:"books in libraries"}}
          data={library}
          width="100%"
          height="400px"
          legendToggle
        />,<Chart
        chartType="PieChart"
        options={{title:"genres"}}
        data={genre}
        width="100%"
        height="400px"
        legendToggle
      />,<Chart
      chartType="PieChart"
      options={{title:"student type"}}
      data={studenttype}
      width="100%"
      height="400px"
      legendToggle
    />
          
        ])
        
}

export default Admin