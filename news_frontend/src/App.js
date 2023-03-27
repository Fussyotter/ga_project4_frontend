import react, {useState, useEffect} from 'react';
import axios from 'axios';
import CreateBookmark from './components/CreateBookmark'

import './App.css';
import React, { useState, useEffect } from 'react';
import Registration from './components/Registration';

const App = () => {

let [bookmarks, setBookmarks] = useState([])

// =========== GET BOOKMARKED ARTICLES ============== //

const getBookmarks = () =>{
  axios
    .get('http://localhost:8000/articles')
    .then((res)=>{
      setBookmarks(res.data)
      console.log(res.data)
    })
}

useEffect(()=>{
  getBookmarks()
}, [])

  return (
    <>
    <h1>News App</h1>
    <Registration />
    </>
  );
}



export default App;
