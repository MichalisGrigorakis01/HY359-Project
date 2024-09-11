import React,{ useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Libraries from './Libraries'
function Bookinfo() {
    const isbn=useParams().isbn;
    const [title,setTitle]=useState('');
    const [author,setAuthor]=useState('');
    const [genre,setGenre]=useState('');
    const [pages,setPages]=useState('');
    const [publicationyear,setPublicationyear]=useState('');
    const [url,setUrl]=useState('');
    const [photo,setPhoto]=useState('');
    const [reviews,setReviews]=useState([]);
    const [libraryid,setLibraryid]=useState([])
    useEffect(()=>{
        axios.get(`http://localhost:3001/books/${isbn}`).then(function (response) {
            setTitle(response.data[0].title)
            setAuthor(response.data[0].authors)
            setGenre(response.data[0].genre)
            setPages(response.data[0].pages)
            setPublicationyear(response.data[0].publicationyear)
            setUrl(response.data[0].url)
            setPhoto(response.data[0].photo)
          })
          axios.get(`http://localhost:3001/reviews/${isbn}`).then(function (response) {
            setReviews(response.data)
          })
          axios.get(`http://localhost:3001/library/${isbn}`).then(function (response) {
            setLibraryid(response.data)

          })
    },[])

    return([<><button>{isbn}</button><button>{title}</button><button>{author}</button><button>{genre}</button>
    <button>{pages}</button><button>{publicationyear}</button><button>{url}</button><button>{photo}</button></>,<ul>
        {reviews.map(item => {
            console.log("aaaaa")
          return <li>{item["reviewScore"]} {item["reviewText"]}</li>;
        })}
      </ul>,<>
        {libraryid.map(item => {
            return(
          <label>
          {"library id :"+item.library_id} <button onClick={()=>{;
            axios.get(`http://localhost:3001/student/${sessionStorage.getItem("user_id")}/${item.library_id}/borrow/${isbn}`).then(function (response) {
              console.log(response.data);
            })
          }}>Rent from here?</button> 
        </label>
        )})}
      </>])

}

export default Bookinfo