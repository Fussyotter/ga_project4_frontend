import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { stringify } from 'flatted';
import Category from './Category';

const API = (props) => {
	let emptyNewsData = {
		author: '',
		title: '',
		description: '',
		url: '',
		urlToImage: '',
		publishedAt: '',
	};
	let [newsData, setNewsData] = useState([]);
	let [search, setSearch] = useState('');
	
	const API = process.env.REACT_APP_API_KEY;

	const getNewsdata = () => {
		axios
			.get(
				`https://newsapi.org/v2/everything?language=en&q=sports&apiKey=${API}`,
				emptyNewsData
			)
			.then((res) => {
				setNewsData(res.data.articles);
				console.log(res.data.articles);
			});
	};

	const handleSearchChange = (e) => {
		axios
			.get(
				`https://newsapi.org/v2/everything?language=en&q='${search}'&apiKey=${API}`
			)
			.then((res) => {
				setNewsData(res.data.articles);
			});
		console.log(e.target.value);
	};

	const handleAddToUser = (article) => {
		const data = {
			author: article.author,
			title: article.title,
			description: article.description,
			url: article.url,
			publishedAt: article.publishedAt,
			user: [props.username],
		};

		axios
			.post('https://news-backend-uppd.onrender.com/articles', data, {
				headers: {
					'Content-Type': 'application/json',
				},
			})
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		getNewsdata();
	}, []);

	return (
		<>
			<h1>News API</h1>
			<div className='searchcontainer'>
				<input
					className='searchbar'
					type='text'
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<button className='searchbutton' onClick={handleSearchChange}>
					Search
				</button>
			</div>
      <Category newsData={newsData} setNewsData={setNewsData}/>
      
      
<div className='grid'>
			{newsData.map((news) => {
				return (
					<>
						<div className='article'>
							<div className='card'>
								<img src={news.urlToImage} />
								<h3>{news.title}</h3>
								<h5>Written by: {news.author}</h5>
								<details>
									<p>{news.description}</p>
								</details>
								<h6>
									<a href={news.url}>Read more</a>
								</h6>
								<button onClick={() => handleAddToUser(news)}>
									Add Bookmark
								</button>

								<h6>Published at: {news.publishedAt}</h6>
							</div>
						</div>
					</>
				);
			})}
      </div>
		</>
	);
};

export default API;
