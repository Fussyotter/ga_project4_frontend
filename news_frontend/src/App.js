import react, {useState, useEffect} from 'react';
import axios from 'axios';

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

    <h1>Bookmarks</h1>
    
    {bookmarks.map((bookmark)=>{
      return(
        <div className='bookmark' key={bookmark.id}>
          <img src= {bookmark.url}/>
          <h3>{bookmark.title}</h3>
          <h5>written by: {bookmark.author}</h5>
          <p>{bookmark.description}</p>
          <h5>Published at: {bookmark.publishedAt}</h5>
        </div>
      )
    })}
    
    </>
  );
}

export default App;
