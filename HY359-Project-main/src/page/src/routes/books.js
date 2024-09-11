import React,{ useState,useEffect } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
function Book({books}){
  const link="/books/"+books.isbn
    console.log(sessionStorage.getItem("usertype"))
  if(sessionStorage.getItem("usertype")==="student" || sessionStorage.getItem("usertype")==="librarian"){
    return (
      <><Link to={link}>
      <button>{books.title} {books.authors} {books.genre} {books.pages} {books.publicationtyear}</button>
    </Link>
      <br></br></>);
  }else{
    return (
    <><Link to={link}>
    <button disabled>{books.title} {books.authors} {books.genre} {books.pages} {books.publicationtyear}</button>
  </Link>
    <br></br></>);}
}

export default Book

