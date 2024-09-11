import pic from "./Pictures/logo.jpg"
import background from "./Pictures/LibraryPhoto.jpg"
import UserProfileLogo from "./Pictures/UserProfile.png";
import './home.css';
import {Link} from "react-router-dom";
import Book from './books'
import React,{ useState,useEffect } from 'react';
import axios from 'axios';



//lepei to user profile button an einai syndedemenos o xrhsths
function Home() {

  const [books1,setBooks1] = useState([{}])
  useEffect(()=>{
    axios.get('http://localhost:3001/books').then(function (response) {
        setBooks1(response.data)
        console.log(books1)
      })
  }, []);

  const [searchTerm,setSearchTerm] = useState('');
  
if(sessionStorage.getItem("usertype")==="student" || sessionStorage.getItem("usertype")==="librarian"){
  return ([
    <>
    <div className="App">
      <header className="App-header">
        <div className="Header">
          <img src={pic} className="App-logo" alt="logo"/>
          <div className="right">
            <Link to="/userprofile">
              <img src={UserProfileLogo} width="40" height="40" alt="error"/>
            </Link>
            <ul>
              <button onClick={()=>{
                sessionStorage.setItem("usertype",null);
                sessionStorage.setItem("username",null);
                sessionStorage.setItem("user_id",null);
                window.location.reload()
              }}>signout</button>
            </ul>
          </div>
        </div>
        {/*Search Bar*/}
        <div class="topnav">
          <input type="text" placeholder="Search.."></input>
        </div>

        <div className="center">
          <h1>Library</h1>
          <p>
            Choose the book of your dreams!
          </p>
        </div>
      </header>
      </div>
      {/*Search Bar*/}
      <div className="App">
          <input type="text" placeholder="Search..."onChange={event=>{setSearchTerm(event.target.value)}}/>
          <br></br>
          {books1.filter((val)=>{
            if(searchTerm==""){
              return val
            }else if(val.title.toLowerCase().includes(searchTerm.toLowerCase())){
              return val
            }
          }).map(book=>{
            return (<Book books={book}/>
            );
          })}
        </div>
      
      <div className="App">
      <body>
        <br></br>
        <div className="App-background">
          <img src={background} alt="background"/><br></br>
        </div>
      </body>
      <footer>
        <div className="footer">
          <p>
                <a href="https://www.csd.uoc.gr">Computer Science Department</a><br></br><br></br>
                &ensp;&ensp;&ensp;
                <a href="http://math.uoc.gr/el/">Department of Mathematics and Applied Mathematics</a><br></br><br></br>
                &ensp;&ensp;&ensp;
                <a href="https://www.physics.uoc.gr">Department of Physics</a><br></br><br></br>
                &ensp;&ensp;&ensp;
                <a href="https://economics.soc.uoc.gr/en">Department Of Economics</a><br></br><br></br>
                &ensp;&ensp;&ensp;
                <a href="https://eudoxus.gr">Εύδοξος</a><br></br><br></br>
          </p>
        </div>
      </footer>
    </div>
    </>
  ]);
}else{
  return ([
    <>
    <div className="App">
      <header className="App-header">
        <div className="Header">
          <img src={pic} className="App-logo" alt="logo"/>
          <div className="right">
          <img src={UserProfileLogo} width="40" height="40" alt="error"/>
            <ul>
            <Link to="/signin">
              <button>Signin</button>
            </Link>
            <br></br>
            <Link to="/signup">
              <button>signup</button>
            </Link>
            </ul>
          </div>
        </div>
        {/*Search Bar*/}
        <div class="topnav">
          <input type="text" placeholder="Search.."></input>
        </div>

        <div className="center">
          <h1>Library</h1>
          <p>
            Choose the book of your dreams!
          </p>
        </div>
      </header>
      </div>
      </>,books1.map(book => {
            return <Book books={book} />
          }),
      <>
      
      <div className="App">
      <body>
        <br></br>
        <div className="App-background">
          <img src={background} alt="background"/><br></br>
        </div>
      </body>
      <footer>
        <div className="footer">
          <p>
                <a href="https://www.csd.uoc.gr">Computer Science Department</a><br></br><br></br>
                &ensp;&ensp;&ensp;
                <a href="http://math.uoc.gr/el/">Department of Mathematics and Applied Mathematics</a><br></br><br></br>
                &ensp;&ensp;&ensp;
                <a href="https://www.physics.uoc.gr">Department of Physics</a><br></br><br></br>
                &ensp;&ensp;&ensp;
                <a href="https://economics.soc.uoc.gr/en">Department Of Economics</a><br></br><br></br>
                &ensp;&ensp;&ensp;
                <a href="https://eudoxus.gr">Εύδοξος</a><br></br><br></br>
          </p>
        </div>
      </footer>
    </div>
    </>
  ]);
}
  
}

export default Home;
