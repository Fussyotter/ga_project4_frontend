import React, {useState, useEffect} from "react";
import axios from "axios";


const API = () => {
let emptyNewsData = {author:'', title:'', description:'', url:'', urlToImage:'',publishedAt:''}
let [newsData, setNewsData] = useState([])

const getNewsdata = () =>{
    axios
        .get(`https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=11521f070b4c48fda14b33dc24389d9c`, emptyNewsData)
        .then((res)=>{
            setNewsData(res.data.articles)
            console.log(res.data.articles)
        })
}

useEffect(()=>{
    getNewsdata()
}, [])

    return (
        <>
        <h1>News API</h1>
        {newsData.map((news)=>{
            return(
            <>

                <img src={news.urlToImage}/>
                <h3>{news.title}</h3>
                <h5>Written by: {news.author}</h5>
                <p>{news.description}</p>
                <h6><a href={news.url}>Read more</a></h6>
                
                <h6>Published at: {news.publishedAt}</h6>

            </>
            )
        })}
        </>
    );
}

export default API;