import React, { useState, useEffect } from "react";
import axios from "axios";

const Category = () => {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState([]);

  const getArticles = async () => {
    const API_KEY = "170825ce728b4277a6f2e52ae956bc8a";
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

  return (
    <>
      <h1>News API</h1>
      <h3>
        <b>Category</b>
      </h3>
      {articles.map((news) => (
        <div key={news.url}>
          <h2>{news.title}</h2>
          <p>{news.description}</p>
         <a href={news.url}>Read more</a>
        </div>
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
