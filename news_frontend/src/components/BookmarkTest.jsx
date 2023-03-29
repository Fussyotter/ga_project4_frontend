import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Article = ( props ) => {
	const [article, setArticle] = useState(null);

	useEffect(() => {
		const fetchArticle = async () => {
			try {
				const response = await axios.get(
					`http://localhost:8000/articles/user/${props.username}/`,
					{
						headers: {
							Authorization: `Token ${props.token}`,
						},
					}
				);
				setArticle(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchArticle();
	}, [props.token, props.username]);

	if (!article) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h2>{article.title}</h2>
			<p>{article.description}</p>
			<p>Author: {article.author}</p>
		</div>
	);
};

export default Article;
