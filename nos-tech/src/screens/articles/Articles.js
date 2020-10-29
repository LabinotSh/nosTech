import React from 'react'
import './articles.css'
import Banner from '../../components/banner/Banner'
import ArticlesComp from '../../components/articlesComponent/articlesComponent'
import ArticlesAdv from '../../components/articlesComponent/articlesAdvert'


function Articles() {

    return (
        <div >
        <Banner/>
        <div className="col-xl-12">
        <h5 className="pl-3">Latest</h5>
        <ArticlesComp />
        <ArticlesAdv />
        </div>
        </div>
    )
}

export default Articles
