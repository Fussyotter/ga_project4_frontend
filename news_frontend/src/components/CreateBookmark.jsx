import React, { useState, useEffect } from "react";



const CreateBookmarks = (props) => {
  let emptyBookmarks = { title: "", description: "", url: "" };
  const [news, setNews] = useState(emptyBookmarks);

  const handleChange = (e) => {
    setNews({ ...news, [e.target.title]: e.target.value });
  };

    const handleSubmit = (e) => {
    e.preventDefault();
    props.handleCreate(news);
  };

  return (
    <>
        <h1>Create Bookmarks</h1>
        <form onSubmit={handleSubmit}>
        <label htmlFor="name">Author: </label>
            <input type="text" name="author" onChange={handleChange} />
            <br />
            <br />
            <label htmlFor="name">Title: </label>
            <input type="text" name="title" onChange={handleChange} />
            <br />
            <br />
            <label htmlFor="age">Description: </label>
            <input type="number" name="description" onChange={handleChange} />
            <br />
            <br />
            <label htmlFor="name">News URL: </label>
            <input type="text" name="url" onChange={handleChange} />
            <br />
            <br />
            <label htmlFor="name">Published At: </label>
            <input type="text" name="publishedAt" onChange={handleChange} />
            <br />
            <br />
            <input type="submit" />
        </form>
    </>
    );
};
export default CreateBookmarks;
