import React, { useEffect, useState } from "react";
import axios from "axios";
import "./articlesComponent.css";
import { Link } from "react-router-dom";
import { BiTimeFive } from "react-icons/bi";
import { BiNews } from "react-icons/bi";
import { Container, Row, Col } from "react-bootstrap";

const ArticlesComponent = () => {
  const [articles, setArticles] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const getArticles = async () => {
    axios
      .get(
        //  "http://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=1551d11a79c64168a5b239c4e0417a1b"
        "https://gnews.io/api/v4/search?q=example&token=c94d9e42efeca388a8cb65b03608e981"
      )
      .then((response) =>
        response.data.articles.map((article) => ({
          source: `${article.source.name}`,
          title: `${article.title}`,
          url: `${article.url}`,
          urlToImage: `${article.image}`,
          publishedAt: `${article.publishedAt}`,
        }))
      )
      .then((articles) => {
        setArticles(articles);
        setIsLoading(false);
      })
      .catch((error) => ({ setError, setIsLoading: false }));
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <>
      <div className="tech-article-card-component" as="Container">
        {!isLoading ? (
          articles.slice(0, 9).map((article) => {
            const { source, title, url, urlToImage, publishedAt } = article;
            return (
              <div className="testo-artikuj">
                <div
                  className="articles-latest testo-artikuj"
                  key={title}
                  style={{ height: "500px", width: "360px" }}
                >
                  <div>
                    <a
                      href={url}
                      target="_blank"
                      className="articles-img-parent"
                    >
                      <img
                        src={urlToImage}
                        class="card-img-top articles-img-child"
                        alt="..."
                      />
                    </a>
                  </div>
                  <div className="card-body">
                    <div className="tituj-e-sene">
                      <p className="news-artic" style={{ color: "#BC353D" }}>
                        NEWS
                      </p>
                      <h6>
                        <a
                          href={url}
                          className="articles-title"
                          target="_blank"
                        >
                          {title}
                        </a>
                      </h6>
                    </div>
                    <div style={{ height: "70px" }}></div>
                    <div className="card-footer-articles bg-transparent">
                      <div className="article-icons">
                        <div className="card-footer-articles-icon">
                          <BiNews
                            style={{ margin: "0 8px", fontSize: "22px" }}
                          />
                        </div>
                        <div className="card-footer-articles-icon-text">
                          <small className="text-muted">
                            <em>{article.source}</em>
                          </small>
                        </div>
                      </div>
                      <div className="article-icons">
                        <div className="card-footer-articles-icon-text">
                          <BiTimeFive
                            style={{ margin: "0 8px", fontSize: "22px" }}
                          />
                        </div>
                        <div>
                          <small className="text-muted">
                            <em>{publishedAt}</em>
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};
export default ArticlesComponent;
