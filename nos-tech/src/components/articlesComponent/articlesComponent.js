import React, { useEffect, useState } from "react";
import axios from "axios";
import './articlesComponent.css'
import { Link } from "react-router-dom";


const ArticlesComponent = () => {


  const [articles, setArticles] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const getArticles = async () => {
    axios
      .get(
        "http://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=1551d11a79c64168a5b239c4e0417a1b"
      )
      .then(response =>
        response.data.articles.map(article => ({
          author: `${article.author}`,
          title: `${article.title}`,
          url: `${article.url}`,
          urlToImage: `${article.urlToImage}`,
          publishedAt: `${article.publishedAt}`
        }))
      )
      .then(articles => {
        setArticles(articles);
        setIsLoading(false);
      })
      .catch(error => ({ setError, setIsLoading: false }));
  }

  useEffect(() => {
    getArticles();
  }, [])


    return (
      <React.Fragment>
        <div className="row row-cols-1 row-cols-md-3 col-xl-9 float-left mb-5">
          {!isLoading ? (
            articles.slice(0,9).map(article => {
              const { author,title, url,urlToImage, publishedAt } = article;
              return (
                <div className="col mb-4 mt-3 articles-latest" key={title}>
                <hr className="bg-dark w-80"></hr> 
                <div class="card h-100 my-2">
                <a href={url} target="_blank">
                <img src={urlToImage} class="card-img-top articles-img" alt="..."/>
                </a>
                <div class="card-body">

                <div className="card h-100 my-2">

                <img src={urlToImage} className="card-img-top articles-img" alt="..."/>
                <div className="card-body">
 
                <h6><a href={url} className="articles-title" target="_blank">{title}</a></h6>
                </div>
                <div className="card-footer bg-transparent">
                <p className="card-text text-dark row">
                    <small className="text-muted"><strong>By</strong> <em>{author}</em></small>
                    <small className="text-muted"><strong>Published: </strong><em>{publishedAt}</em></small>
                </p>
                </div>
                </div>
                </div>
                
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </React.Fragment>
    );
}
export default ArticlesComponent;
