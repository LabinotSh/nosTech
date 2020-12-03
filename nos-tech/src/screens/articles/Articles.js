import React from "react";
import "./articles.css";
import Banner from "../../components/banner/ArticleBanner";
import ArticlesComp from "../../components/articlesComponent/articlesComponent";
import ArticlesAdv from "../../components/articlesComponent/articlesAdvert";

function Articles() {
  return (
    <div>
      <Banner />
      {/* className="col-xl-12" */}
      <div style={{ display: "flex" }}>
        <ArticlesComp />
        <ArticlesAdv />
      </div>
    </div>
  );
}

export default Articles;
