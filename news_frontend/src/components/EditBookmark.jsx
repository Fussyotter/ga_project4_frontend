import React, { useState } from "react";

const Edit = (props) => {
  // let emptyperson = {name: '', age: ''};
  const [news, setNews] = useState({ ...props.news });

  const handleChange = (e) => {
    setNews({ ...news, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleUpdate(news);
  };

  return (
    <>
   <details>
        <summary className='btn'>Edit Bookmarks</summary>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Author: </label>
        <input
          type="text"
          name="author"
          value={news.author}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="name">Title: </label>
        <input
          type="text"
          name="title"
          value={news.title}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="name">Description: </label>
        <input
          type="text"
          name="name"
          value={news.description}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="name">News url: </label>
        <input
            type="text"
            name="url"
            value={news.url}
            onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="name">Published At: </label>
        <input
            type="text"
            name="publishedAt"
            value={news.publishedAt}
            onChange={handleChange}
        />
        <input type="submit" />
      </form>
      </details>
    </>
  );
};

export default Edit;
