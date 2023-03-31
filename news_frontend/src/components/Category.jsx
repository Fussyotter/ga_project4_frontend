import React, { useState, useEffect } from "react";
import axios from "axios";


const Category = (props) => {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState([]);

  const getArticles = async () => {
    const API = process.env.REACT_APP_API_KEY
    const url = `https://newsapi.org/v2/top-headlines?language=en&category=${category}&apiKey=${API}`;
    const response = await axios.get(url);
    props.setNewsData(response.data.articles);
  };

  useEffect(() => {
    getArticles();
  }, [category]);

  const handleCategoryChange = (category) => {
    setCategory(category);
  };
  return (
    <>
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
           
      {articles.map((news) => (
       <>
        <div className="article" key={news.url}>
            <div className="card">
          <img src={news.urlToImage} alt="Image not available" />
          <h3>Title:{news.title}</h3>
          <p>Description: {news.description}</p>
          <h6>Published at: {news.publishedAt}</h6>
          <a href={news.url}>Read more...</a>
          </div>
        </div>
        </>
      ))}
    </>
  );
};

export default Category;
