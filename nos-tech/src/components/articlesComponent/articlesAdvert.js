import React, { useEffect, useState } from "react";
import axios from "axios";
import "./articlesComponent.css";
import "./articles-advert.css";

const ArticlesAdv = () => {
  const [articles, setArticles] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const getArticlesAdv = async () => {
    axios
      .get(
        "http://newsapi.org/v2/everything?q=apple&from=2020-12-01&to=2020-12-01&sortBy=popularity&apiKey=e1cbebfb007e43dca809310e34ab40e4"
        // "https://gnews.io/api/v4/search?q=example&token=c94d9e42efeca388a8cb65b03608e981"
      )
      .then((response) =>
        response.data.articles.map((article) => ({
          title: `${article.title}`,
          url: `${article.url}`,
          urlToImage: `${article.urlToImage}`,
        }))
      )
      .then((articles) => {
        setArticles(articles);
        setIsLoading(false);
      })
      .catch((error) => ({ setError, setIsLoading: false }));
  };

  useEffect(() => {
    getArticlesAdv();
  }, []);
  {
    return (
      <>
        <div as="Container" className="test-adv text-center">
          {!isLoading ? (
            <p
              style={{
                margin: "35px",
                fontSize: "21px",
              }}
            >
              Latest Issues from &nbsp;
              <a
                href="https://apple.com"
                style={{
                  color: "black",
                  fontStyle: "italic",
                  textDecoration: "underline",
                }}
              >
                Apple:
              </a>
            </p>
          ) : null}

          {!isLoading ? (
            articles.slice(0, 7).map((article) => {
              const { title, url, urlToImage } = article;
              return (
                <>
                  <div className="articles-adv-div test-adv-dy">
                    <div className="test-adv-tre">
                      <div className="articles-adv-parent">
                        <a
                          className="article-adv-title text-center"
                          target="_blank"
                          href="url"
                        >
                          "{title}"
                        </a>
                        <div className="articles-advert-image-main">
                          {/* <a
                        href={url}
                        target="_blank"
                        className="articles-adv-img-parent"
                      > */}
                          <img
                            href={url}
                            src={urlToImage}
                            class="card-img-top articles-adv-img-child articles-adv-img-parent"
                            alt="..."
                          />
                          {/* </a> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <div style={{ display: "none" }}></div>
          )}
        </div>
      </>
    );
  }
};

export default ArticlesAdv;
