import React,{ useEffect, useState } from 'react';
import axios from 'axios';
import { jsPDF } from "jspdf";

function Userprofile() {
    const [username,setUsername]=useState('')
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [firstname,setFirstname]=useState('');
    const [lastname,setLastname]=useState('');
    const [birthday,setBirthday]=useState('');
    const [gender,setGender]=useState('');
    const [country,setCountry]=useState('');
    const [city,setCity]=useState('');
    const [address,setAddress]=useState('');
    const [studenttype,setStudenttype]=useState('');
    const [studentid,setStudentid]=useState('');
    const [studentidfromdate,setStudentidfromdate]=useState('');
    const [studentidtodate,setStudentidtodate]=useState('');
    const [university,setUniversity]=useState('');
    const [department,setDepartment]=useState('');
    const [lat,setLat]=useState('');
    const [lon,setLon]=useState('');
    const [telephone,setTelephone]=useState('');
    const [personalpage,setPersonalpage]=useState('');
    const [borrowed,setBorrowed]=useState([]);
    const [libraryname,setLibraryname]=useState('');
    const [libraryinfo,setLibraryinfo]=useState('');
    const [librarian,setLibrarian]=useState([]);
    function clickhandle(type,field){
        let value=prompt("Enter new value",type)
        axios.post('http://localhost:3001/user', {
            type: sessionStorage.getItem("usertype"),
            field: field,
            newname:value,
            oldname:type
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
   

    useEffect(()=>{
        axios.get(`http://localhost:3001/user/${sessionStorage.getItem("username")}`).then(function (response) {
            console.log(response.data[0])
            setUsername(response.data[0].username)
            setEmail(response.data[0].email)
            setPassword(response.data[0].password)
            setFirstname(response.data[0].firstname)
            setLastname(response.data[0].lastname)
            setBirthday(response.data[0].birthdate)
            setGender(response.data[0].gender)
            setCountry(response.data[0].country)
            setCity(response.data[0].city)
            setAddress(response.data[0].address)
            setStudenttype(response.data[0].student_type)
            setStudentid(response.data[0].student_id)
            setStudentidfromdate(response.data[0].student_id_from_date)
            setStudentidtodate(response.data[0].student_id_to_date)
            setUniversity(response.data[0].university)
            setDepartment(response.data[0].department)
            setLat(response.data[0].lat)
            setLon(response.data[0].lon)
            setTelephone(response.data[0].telephone)
            setPersonalpage(response.data[0].personalpage)
            setLibraryinfo(response.data[0].libraryinfo)
            setLibraryname(response.data[0].libraryname)
            
          })
          axios.get(`http://localhost:3001/borrowed/${sessionStorage.getItem("user_id")}}`).then(function (response) {
                setBorrowed(response.data)
          })
          axios.get(`http://localhost:3001/librarian`).then(function (response) {
                setLibrarian(response.data)
          })
    },[])

    if(sessionStorage.getItem("usertype")==="student"){
        return([<><button disabled>{username}</button><button onClick={(e)=>{clickhandle(email,"email"); console.log("hello")}}>{email}</button><button onClick={(e)=>{clickhandle(password,"password")}}>{password}</button><button onClick={(e)=>{clickhandle(firstname,"firstname")}}>{firstname}</button><button onClick={(e)=>{clickhandle(lastname,"lastname")}}>{lastname}</button><button onClick={(e)=>{clickhandle(birthday,"birthdate")}}>{birthday}</button><button onClick={(e)=>{clickhandle(gender,"gender")}}>{gender}</button><button onClick={(e)=>{clickhandle(country,"country")}}>{country}</button>
    <button onClick={(e)=>{clickhandle(city,"city")}}>{city}</button><button onClick={(e)=>{clickhandle(address,"address")}}>{address}</button><button onClick={(e)=>{clickhandle(studenttype,"student_type")}}>{studenttype}</button><button onClick={(e)=>{clickhandle(studentid,"student_id")}}>{studentid}</button><button onClick={(e)=>{clickhandle(studentidfromdate,"student_id_from_date")}}>{studentidfromdate}</button><button onClick={(e)=>{clickhandle(studentidtodate,"student_id_to_date")}}>{studentidtodate}</button>
    <button onClick={(e)=>{clickhandle(university,"university")}}>{university}</button><button onClick={(e)=>{clickhandle(department,"department")}}>{department}</button><button onClick={(e)=>{clickhandle(lat,"lat")}}>{lat}</button><button onClick={(e)=>{clickhandle(lon,"lon")}}>{lon}</button><button onClick={(e)=>{clickhandle(telephone,"telephone")}}>{telephone}</button><button onClick={(e)=>{clickhandle(personalpage,"personalpage")}}>{personalpage}</button></>
    ,borrowed.map(item=>{
        if(item.status==="requested" || item.status==="borrowed"){
            return(
                <label> <br></br>
          {"bookcopy id :"+item.bookcopy_id } {"borrowed on :"+item.fromdate} {"until :"+item.todate } <button >Return</button> 
        </label>
            )
        }else if(item.status==="successEnd"){
            return(
                <label> <br></br>
          {"bookcopy id :"+item.bookcopy_id } {"borrowed on :"+item.fromdate} {"until :"+item.todate } <button onClick={()=>{
            let text=prompt("give a short review!","its aight");
            let score=prompt("give a rating 1-10");
            axios.post(`http://localhost:3001/review`,{
                bookcopy_id:item.bookcopy_id,
                user_id:sessionStorage.getItem("user_id"),
                reviewtext:text,
                reviewScore:score
            }).then(function (response) {
                console.log(response.data)
          })
          }}>Leave review</button> 
        </label>
            )
        }else{
            return(
                <label> <br></br>
          {"bookcopy id :"+item.bookcopy_id } {"borrowed on :"+item.fromdate} {"until :"+item.todate }
        </label>
            )
        }
    })])
    }else{
        return([<><button disabled>{username}</button><button onClick={(e)=>{clickhandle(email,"email");}}>{email}</button><button onClick={(e)=>{clickhandle(password,"password")}}>{password}</button><button onClick={(e)=>{clickhandle(firstname,"firstname")}}>{firstname}</button><button onClick={(e)=>{clickhandle(lastname,"lastname")}}>{lastname}</button><button onClick={(e)=>{clickhandle(birthday,"birthdate")}}>{birthday}</button><button onClick={(e)=>{clickhandle(gender,"gender")}}>{gender}</button><button onClick={(e)=>{clickhandle(country,"country")}}>{country}</button>
    <button onClick={(e)=>{clickhandle(city,"city")}}>{city}</button><button onClick={(e)=>{clickhandle(address,"address")}}>{address}</button>
    <button onClick={(e)=>{clickhandle(libraryname,"libraryname")}}>{libraryname}</button><button onClick={(e)=>{clickhandle(libraryinfo,"libraryinfo")}}>{libraryinfo}</button><button onClick={(e)=>{clickhandle(lat,"lat")}}>{lat}</button><button onClick={(e)=>{clickhandle(lon,"lon")}}>{lon}</button><button onClick={(e)=>{clickhandle(telephone,"telephone")}}>{telephone}</button><button onClick={(e)=>{clickhandle(personalpage,"personalpage")}}>{personalpage}</button></>
    ,<br></br>,<br></br>,<br></br>,<button onClick={(e)=>{
        let isbn=prompt("give isbn");
        let title=prompt("give title");
        let authors=prompt("give authors");
        let pages=prompt("give no of pages");
        let genre=prompt("give genre");
        let publicationyear=prompt("give publicationyear");
        let url=prompt("give websiteurl");
        let photo=prompt("give photo url");
        axios.post('http://localhost:3001/book/new',{
           isbn:isbn,
           title:title,
           authors:authors,
           genre:genre,
           pages:pages ,
           publicationyear:publicationyear,
           url:url,
           photo:photo,
           library_id:sessionStorage.getItem("user_id")
        }).then(function (response) {
        console.log(response.data);
      })
    }}>Add book</button>,<br></br>,<br></br>,<button onClick={()=>{
        let isbn=prompt("give valid isbn from books");
        axios.get(`http://localhost:3001/book/${sessionStorage.getItem("user_id")}/${isbn}`).then(function (response) {
        console.log(response.data);
      })
    }}>Make book available</button>,<br></br>,<br></br>,librarian.map((item)=>{
        if(item.status==="returned"){
            return(<label> <br></br>
            {"bookcopy id :"+item.bookcopy_id } {"borrowed on :"+item.fromdate} {"until :"+item.todate } <button onClick={()=>{
                axios.get(`http://localhost:3001/conversion/${item.bookcopy_id}`).then(function (response) {
                    console.log(response.data);
                  })
            }}>Accept book back</button> 
          </label>)
        }else{
            return(<label> <br></br>
            {"bookcopy id :"+item.bookcopy_id } {"borrowed on :"+item.fromdate} {"until :"+item.todate } <button onClick={()=>{
                axios.get(`http://localhost:3001/start/${item.bookcopy_id}`).then(function (response) {
                    console.log(response.data);
                  })
            }}>Give Book</button> 
          </label>)
        }
    }),<button onClick={()=>{
        const doc=new jsPDF();
        let test="";
        axios.get(`http://localhost:3001/borrowing`).then(function (response) {
                    for(let i=0;i<response.data.length;i++){
                              test=test+JSON.stringify(response.data[i])
                    }
                    console.log(test)
                    doc.text(test,10,10)
                    doc.save("data.pdf")
                  })
    }}>Download info</button>])
    }

}

export default Userprofile