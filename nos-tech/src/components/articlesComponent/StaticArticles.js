import React from "react";
import { BiTimeFive } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import "./static-articles.css";

const StaticArticles = () => {
  const articlesList = [
    {
      title:
        "Neuroglee gets $2.3 million to develop digital therapeutics for neurodegenerative diseases",
      authorName: "Catherine Shu",
      articleImage: require("../../assets/images/tech-one.jpeg"),
      articlePublishedAt: "2020-12-03T01:00:53Z",
    },
    {
      title:
        "Govtech intelligence platform, The Atlas for Cities, bought by Government Executive Media Group",
      authorName: "Jonathan Shieber",
      articleImage: require("../../assets/images/tech-one.jpeg"),
      articlePublishedAt: "2020-12-03T00:40:29Z",
    },
    {
      title: "Google shutting down Poly 3D content platform",
      authorName: "Lucas Matney",
      articleImage: require("../../assets/images/tech-one.jpeg"),
      articlePublishedAt: "2020-12-02T23:54:05Z",
    },
    {
      title: "Hulu officially launches its co-viewing feature Watch Party",
      authorName: "Sarah Perez",
      articleImage: require("../../assets/images/tech-one.jpeg"),
      articlePublishedAt: "December 1st, 2020",
    },
    {
      title: "Salesforce slumps 8.5% as its post-Slack selloff continues",
      authorName: "Alex Wilhelm, Ron Miller",
      articleImage: require("../../assets/images/tech-one.jpeg"),
      articlePublishedAt: "December 1st, 2020",
    },
    {
      title: "Daily Crunch: Apple announces its best apps of 2020",
      authorName: "Anthony Ha",
      articleImage: require("../../assets/images/tech-one.jpeg"),
      articlePublishedAt: "December 1st, 2020",
    },
    {
      title: "Hulu officially launches its co-viewing feature Watch Party",
      authorName: "Sarah Perez",
      articleImage: require("../../assets/images/tech-one.jpeg"),
      articlePublishedAt: "December 2nd, 2020",
    },
    {
      title:
        "Sketchy wants to replace boring textbooks with ‘Pixar-like’ videos",
      authorName: "Natasha Mascarenhas",
      articleImage: require("../../assets/images/tech-one.jpeg"),
      articlePublishedAt: "December 2nd, 2020",
    },
  ];

  const renderStaticArticles = (staticArticle, index) => {
    return (
      <div as="Container">
        <div className="testo-artikuj">
          <div
            className="articles-latest testo-artikuj"
            key={index}
            style={{ height: "500px", width: "360px" }}
          >
            <div className="articles-image-main">
              {/* <a
          href={url}
          target="_blank"
          className="articles-img-parent"
        > */}
              <img
                src={staticArticle.articleImage}
                class="card-img-top articles-img-child articles-img-parent"
                alt="..."
              />
              {/* </a> */}
            </div>
            <div className="card-body">
              <div className="tituj-e-sene">
                <p className="news-artic" style={{ color: "#BC353D" }}>
                  NEWS
                </p>
                <h6>
                  <a
                    href="https://google.com"
                    className="articles-title"
                    target="_blank"
                  >
                    {staticArticle.title}
                  </a>
                </h6>
              </div>
              <div style={{ height: "70px" }}></div>
              <div className="card-footer-articles bg-transparent">
                <div className="article-icons">
                  <div className="card-footer-articles-icon">
                    <AiOutlineUser
                      style={{ margin: "0 8px", fontSize: "22px" }}
                    />
                  </div>
                  <div className="card-footer-articles-icon-text">
                    <small className="text-muted">
                      <em>{staticArticle.authorName}</em>
                    </small>
                  </div>
                </div>
                <div className="article-icons">
                  <div className="card-footer-articles-icon-text">
                    <BiTimeFive style={{ margin: "0 8px", fontSize: "22px" }} />
                  </div>
                  <div>
                    <small className="text-muted">
                      <em>{staticArticle.articlePublishedAt}</em>
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="static-articles-grid">
      {articlesList.map(renderStaticArticles)}
    </div>
  );
};

export default StaticArticles;
