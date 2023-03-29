import React, { useState, useEffect } from "react";
import axios from "axios";


const Category = () => {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState([]);

  const getArticles = async () => {
    const API_KEY = "a47d3f89e50f4c399034797f62f2e2b4";
    const url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${API_KEY}`;
    const response = await axios.get(url);
    setArticles(response.data.articles);
  };

  useEffect(() => {
    getArticles();
  }, [category]);

  const handleCategoryChange = (category) => {
    setCategory(category);
  };
  //   function handleSubmit(event) {
  //     event.preventDefault();

  //   }

  return (
    <>
      {/* <h2>Search Category</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <button type="submit">Search</button>
      </form> */}
      <h2 class="h1">Category</h2>
      
      {articles.map((news) => (
       <>
        <div className="article" key={news.url}>
            <div className="card">
          <img src={news.urlToImage} alt="" />
          <h2>{news.title}</h2>
          <p>{news.description}</p>
          <h6>Published at: {news.publishedAt}</h6>
          <a href={news.url}>Read more...</a>
          </div>
        </div>
        </>
      ))}
      

      <ul className="categoryButtons">
        <li>
          <button onClick={() => handleCategoryChange("technology")}>
            Technology
          </button>
        </li>
        <li>
          <button onClick={() => handleCategoryChange("health")}>Health</button>
        </li>
        <li>
          <button onClick={() => handleCategoryChange("entertainment")}>
            Entertainment
          </button>
        </li>
        <li>
          <button onClick={() => handleCategoryChange("sports")}>Sports</button>
        </li>
        <li>
          <button onClick={() => handleCategoryChange("science")}>
            Science
          </button>
        </li>
        <li>
          <button onClick={() => handleCategoryChange("business")}>
            Business
          </button>
        </li>
      </ul>
    </>
  );
};

export default Category;
