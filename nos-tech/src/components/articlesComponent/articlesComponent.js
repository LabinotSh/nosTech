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
        <div class="row row-cols-1 row-cols-md-3 col-xl-9 float-left mb-5">
          {!isLoading ? (
            articles.slice(0,9).map(article => {
              const { author,title, url,urlToImage, publishedAt } = article;
              return (
                <div class="col mb-4 mt-3 articles-latest" key={title}>
                <hr className="bg-dark w-80"></hr>
                <div class="card h-100 my-2">

                <img src={urlToImage} class="card-img-top articles-img" alt="..."/>
                <div class="card-body">
                <h6><a href={url} className="articles-title" target="_blank">{title}</a></h6>
                </div>
                <div class="card-footer bg-transparent">
                <p class="card-text text-dark row">
                    <small class="text-muted"><strong>By</strong> <em>{author}</em></small>
                    <small class="text-muted"><strong>Published: </strong><em>{publishedAt}</em></small>
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
