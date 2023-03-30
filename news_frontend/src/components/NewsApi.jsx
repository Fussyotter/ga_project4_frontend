import React, {useState, useEffect} from "react";
import axios from "axios";


const API = () => {
let emptyNewsData = {author:'', title:'', description:'', url:'', urlToImage:'',publishedAt:''}
let [newsData, setNewsData] = useState([])
let [search, setSearch] = useState('')


const getNewsdata = () =>{
    axios
        .get(`https://newsapi.org/v2/everything?language=en&q=sports&apiKey=11521f070b4c48fda14b33dc24389d9c`, emptyNewsData)
        .then((res)=>{
            setNewsData(res.data.articles)
            console.log(res.data.articles)
        })
}

const handleSearchChange = (e) =>{
    
    axios.get(
			`https://newsapi.org/v2/everything?language=en&q='${search}'&apiKey=11521f070b4c48fda14b33dc24389d9c`
		).then((res)=> {
            setNewsData(res.data.articles)
        });
    console.log(e.target.value)
}

useEffect(()=>{
    getNewsdata()
}, [])

    return (
        <>
        <h1>News API</h1>
        
        <div className="searchcontainer">
            <input className="searchbar" type ='text' value ={search} onChange={(e) => setSearch(e.target.value)}/>
            <button className="searchbutton" onClick={handleSearchChange}>Search</button>
        </div>
        
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