import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateBookmark from './components/CreateBookmark.jsx';
import EditBookmark from './components/EditBookmark';
import API from './components/NewsApi.jsx';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import Category from './components/Category.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './test.css';
import './App.css';
// import dotenv from 'dotenv';
// dotenv.config();


const App = () => {


let [bookmarks, setBookmarks] = useState([])

// =========== GET BOOKMARKED ARTICLES ============== //

const getBookmarks = () =>{
  axios.get('https://news-backend-uppd.onrender.com/articles').then((res) => {
		setBookmarks(res.data);
		console.log(res.data);
	});
}


// =============== CREATE BOOKMARK ============ //

const handleCreate = (newBookmark) =>{
  axios
		.post('https://news-backend-uppd.onrender.com/articles', newBookmark)
		.then((res) => {
			console.log(res);
			getBookmarks();
		});
}

// =================== DELETE BOOKMARK ============= //

const handleDelete = (event) =>{
console.log(event)
  axios
		.delete(
			`https://news-backend-uppd.onrender.com/articles/${event.target.value}`
		)
		.then((res) => {
			getBookmarks();
		});
}

 // =============== UPDATE BOOKMARK ============ //
  const handleUpdate = (editBookmark) => {
    console.log(editBookmark);
    axios
			.put(
				`https://news-backend-uppd.onrender.com/articles/${editBookmark.id}`,
				editBookmark
			)
			.then((res) => {
				getBookmarks();
			});
  };

useEffect(()=>{
  getBookmarks()
}, [])

  return (
    <div className="body">

    <div className="nav">

        <div className="logocontainer"><img src="https://cdn-icons-png.flaticon.com/512/21/21601.png" className="logo"/>
        </div>

        <div className="users">
            <div className="signup"><Signup/></div>
        </div>

    </div>
    {/* <Category /> */}
            <Login/>
   
    
    
    
    <ToastContainer />
  
    
    <h1>Bookmarks</h1>

    
    <CreateBookmark handleCreate={handleCreate}/>

    {bookmarks.map((bookmark)=>{
      return(
        <div className='article' key={bookmark.id}>
          <div className="card">
          <img src= {bookmark.url}/>
          <h3>{bookmark.title}</h3>
          <h5>written by: {bookmark.author}</h5>
          <p>{bookmark.description}</p>
          <h5>Published at: {bookmark.publishedAt}</h5>
          <EditBookmark handleUpdate={handleUpdate}   news={bookmark}/>
          <button onClick={handleDelete} value={bookmark.id}>Delete</button>
          </div>
        </div>
      )
    })}
    
    </div>
  );

};

export default App;
