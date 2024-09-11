const express=require('express');
const app = express();
const mysql=require('mysql2/promise');
const port= process.env.PORT || 3001;
const sessions = require('express-session');
const bodyParser=require("body-parser");
const nodemailer = require('nodemailer');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
const oneDay = 1000 * 60 * 60 * 24;
const transporter = nodemailer.createTransport({
    port: 587,               // true for 465, false for other ports
    host: "hotmail",
       auth: {
            user: 'hy359project2023@hotmail.com',
            pass: 'TELIOSkwdikos',
         },
    });
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
const coninfo={
        host: "localhost",
        user: "root",
        password: "",
        database:'hy359_2022'
      }
var sess;
app.post('/signin',async (req,res)=>{
    var con = await mysql.createConnection(coninfo);
    let signin=false;
    let id;
    let type;
    const users=await con.execute("SELECT username,password,user_id FROM students ");
    for(let i=0;i<users[0].length;i++){
        if(users[0][i].username===req.body.username){
            if(users[0][i].password===req.body.password){
                sess=req.session;
                sess.username=req.body.username;
                signin=true;
                id=users[0][i].user_id
                type="student";
            }
        }
    }
    if(signin===false){
        const users=await con.execute("SELECT username,password,library_id FROM librarians");
        for(let i=0;i<users[0].length;i++){
            if(users[0][i].username===req.body.username){
                if(users[0][i].password===req.body.password){
                    sess=req.session;
                    sess.username=req.body.username;
                    signin=true;
                    id=users[0][i].library_id
                    type="librarian"
                }
            }
        }
    }
    res.json({"signin":signin,"type":type,"user_id":id})
})

app.get('/forgotpassword',async (req,res)=>{
    var con = await mysql.createConnection(coninfo);
        let info = await transporter.sendMail({
            from: 'hy359project2023@hotmail.com', // sender address
            to: "stavrosgzzz@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
          });
    
})




app.get('/admin/userlist',async (req,res)=>{
    var con = await mysql.createConnection(coninfo);
    const users=await con.execute(`SELECT username,firstname,lastname FROM students`);
    const users1=await con.execute(`SELECT username,firstname,lastname FROM librarians`);
    let result=[]

    for(let i=0;i<users[0].length;i++){
        result.push(users[0][i]);
    }

    for(let i=0;i<users1[0].length;i++){
        result.push(users1[0][i]);
    }
    res.json(result)
})


app.post('/admin/deletion',async (req,res)=>{
    var con = await mysql.createConnection(coninfo);
    const users=await con.execute(`DELETE FROM students WHERE username='${req.body.username}'`);
    const users1=await con.execute(`DELETE FROM librarians WHERE username='${req.body.username}'`);
    
    res.json({success:true})
})



app.get('/admin/bookchart',async (req,res)=>{
    var con = await mysql.createConnection(coninfo);
    const books=await con.execute(`SELECT library_id FROM booksinlibraries`);
    let result={}
    result["0"]="no of libraries"
    for(let i=0;i<books[0].length;i++){
       if(isNaN(result[""+books[0][i].library_id])){
        result[""+books[0][i].library_id]=1;
       }else{
        result[""+books[0][i].library_id]=result[""+books[0][i].library_id]+1;

       }
    }
    res.json(Object.entries(result))
})

app.get('/admin/genrechart',async (req,res)=>{
    var con = await mysql.createConnection(coninfo);
    const books=await con.execute(`SELECT genre FROM books`);
    let result={}
    result["0"]="genre types"
    for(let i=0;i<books[0].length;i++){
       if(isNaN(result[""+books[0][i].genre])){
        result[""+books[0][i].genre]=1;
       }else{
        result[""+books[0][i].genre]=result[""+books[0][i].genre]+1;

       }
    }
    res.json(Object.entries(result))
})

app.get('/admin/studentschart',async (req,res)=>{
    var con = await mysql.createConnection(coninfo);
    const books=await con.execute(`SELECT student_type FROM students`);
    let result={"PhD":0,
                "BSc":0,
                "MSc":0
            }
    result["0"]="degree type"
    for(let i=0;i<books[0].length;i++){
      result[books[0][i].student_type]++;
    }
    res.json(Object.entries(result))
})


app.get('/books',async (req,res)=>{
    var con = await mysql.createConnection(coninfo);
    let books=await con.execute("SELECT isbn,title,authors,genre,pages,publicationyear,url,photo FROM books");
    let formattedbook={isbn:"",
                    title:"",
                    authors:"",
                    genre:"",
                    pages:-1,
                    publicationyear:"",
                    url:"",
                    photo:""
    }
    let arr=[];
for(let i=0;i<books[0].length;i++){
    arr.push(books[0][i]);
}
res.send(arr);
})


app.get('/books/:isbn',async (req,res)=>{
    var con = await mysql.createConnection(coninfo);
    let books=await con.execute(`SELECT isbn,title,authors,genre,pages,publicationyear,url,photo FROM books WHERE isbn=${req.params.isbn}`);
    let arr=[];
    for(let i=0;i<books[0].length;i++){
        arr.push(books[0][i]);
    }
    res.send(arr);
})

app.get('/reviews/:isbn',async (req,res)=>{
    var con = await mysql.createConnection(coninfo);
    let books=await con.execute(`SELECT reviewText,reviewScore FROM reviews WHERE isbn=${req.params.isbn}`);
    let arr=[];
    for(let i=0;i<books[0].length;i++){
        arr.push(books[0][i]);
    }
    res.send(arr);
})

app.post("/user",async(req,res)=>{
    var con = await mysql.createConnection(coninfo);
    let books=await con.execute(`UPDATE ${req.body.type+"s"} SET ${req.body.field}='${req.body.newname}' WHERE ${req.body.field}='${req.body.oldname}'`);
    res.send("success");
})
app.get("/user/:username",async(req,res)=>{
    var con = await mysql.createConnection(coninfo);
    let books=await con.execute(`SELECT * FROM students WHERE username='${req.params.username}'`);
    if(books[0].length===0){
         books=await con.execute(`SELECT * FROM librarians WHERE username='${req.params.username}'`);
    }
    res.json(books[0]);
})


app.get("/library/:isbn",async(req,res)=>{
    var con = await mysql.createConnection(coninfo);
    let library=await con.execute(`SELECT library_id FROM booksinlibraries WHERE isbn=${req.params.isbn} AND available='true'`);
    res.json(library[0]);
})

app.get("/student/:user_id/:libraryid/borrow/:isbn",async(req,res)=>{
    let date=new Date().toISOString().split('T')[0];
    let date1=new Date();
    date1.setMonth(date1.getMonth()+1)
    date1=date1.toISOString().split('T')[0];
    var con = await mysql.createConnection(coninfo);
    let bookinfo=await con.execute(`SELECT bookcopy_id FROM booksinlibraries WHERE isbn=${req.params.isbn} AND library_id='${req.params.libraryid}'`);

    let library=await con.execute(`UPDATE booksinlibraries SET available='false' WHERE isbn=${req.params.isbn} AND library_id='${req.params.libraryid}'`);
    let library1=await con.execute(`INSERT INTO borrowing(bookcopy_id,user_id,fromdate,todate,status) VALUES(${bookinfo[0][0].bookcopy_id},${req.params.user_id},'${date}','${date1}','requested')`);

    res.json(library[0]);
})

app.get("/borrowed/:user_id",async(req,res)=>{
    var con = await mysql.createConnection(coninfo);
    let library=await con.execute(`SELECT bookcopy_id,fromdate,todate,status FROM borrowing WHERE user_id='${req.params.user_id}'`);

    res.json(library[0]);
})

app.post("/review",async(req,res)=>{
    var con=await mysql.createConnection(coninfo)
    let isbnraw=await con.execute(`SELECT isbn FROM booksinlibraries WHERE bookcopy_id=${req.body.bookcopy_id}`);
    let review=await con.execute(`INSERT INTO reviews(user_id,isbn,reviewText,reviewScore) VALUE(${req.body.user_id},'${isbnraw[0][0].isbn}','${req.body.reviewtext}',${req.body.reviewScore})`);
    res.send("great success");
})

app.post("/book/new",async(req,res)=>{
    var con=await mysql.createConnection(coninfo);
    await con.execute(`INSERT INTO books(isbn,title,authors,genre,pages,publicationyear,url,photo) VALUE(${req.body.isbn},'${req.body.title}','${req.body.authors}','${req.body.genre}',${req.body.pages},${req.body.publicationyear},'${req.body.url}','${req.body.photo}')`)
    await con.execute(`INSERT INTO booksinlibraries(isbn,library_id,available) VALUE(${req.body.isbn},${req.body.library_id},'false')`)
})

app.get("/book/:library_id/:isbn",async(req,res)=>{
    var con=await mysql.createConnection(coninfo);
    let val=await con.execute(`UPDATE booksinlibraries SET available='true' WHERE isbn=${req.params.isbn} AND library_id=${req.params.library_id}`);
    res.send("test")
})

app.get("/librarian",async(req,res)=>{
    var con=await mysql.createConnection(coninfo);
    let val=await con.execute(`SELECT * FROM borrowing WHERE status='requested' OR status='returned'`);
    res.send(val[0])
})


app.get("/conversion/:bookcopy_id",async(req,res)=>{
    var con=await mysql.createConnection(coninfo);
    let val=await con.execute(`UPDATE booksinlibraries SET available='true' WHERE bookcopy_id=${req.params.bookcopy_id}`);
    let val1=await con.execute(`UPDATE borrowing SET status='successEnd' WHERE bookcopy_id=${req.params.bookcopy_id}`);
    res.send(val[0])
})

app.get("/start/:bookcopy_id",async(req,res)=>{
    var con=await mysql.createConnection(coninfo);
    let val1=await con.execute(`UPDATE borrowing SET status='borrowed' WHERE bookcopy_id=${req.params.bookcopy_id}`);
    res.send(val[0])
})


app.get("/borrowing/",async(req,res)=>{
    var con=await mysql.createConnection(coninfo);
    let val1=await con.execute(`SELECT * FROM borrowing`);
    res.send(val1[0])
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });