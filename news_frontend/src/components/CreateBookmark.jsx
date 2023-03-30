import React, { useState, useEffect } from "react";



const CreateBookmarks = (props) => {
  let emptyBookmarks = { author: "", title: "", description: "", url: "", publishedAt: "" };
  const [news, setNews] = useState(emptyBookmarks);

  const handleChange = (e) => {
    setNews({ ...news, [e.target.name]: e.target.value });
  };

    const handleSubmit = (e) => {
    e.preventDefault();
    props.handleCreate(news);
  };

  return (
    <>
    <details>
    <summary className='btn'>Create Bookmarks</summary>
        <form onSubmit={handleSubmit}>
        
        <label htmlFor="name">Author: </label>
            <input className="createinput" type="text" name="author" onChange={handleChange} />
            <br />
            <br />
            <label htmlFor="name">Title: </label>
            <input className="createinput" type="text" name="title" onChange={handleChange} />
            <br />
            <br />
            <label htmlFor="name">Description: </label>
            <input className="createinput" type="text" name="description" onChange={handleChange} />
            <br />
            <br />
            <label htmlFor="name">News URL: </label>
            <input className="createinput" type="text" name="url" onChange={handleChange} />
            <br />
            <br />
            <label htmlFor="name">Published At: </label>
            <input className="createinput" type="text" name="publishedAt" onChange={handleChange} />
            <br />
            <br />
            <input type="submit" />
        </form>
        </details>
    </>
    );
};
export default CreateBookmarks;
