import React from 'react'
import './articles.css'
import Banner from '../../components/banner/Banner'


function Articles() {
    const techNews=[
        {
            image: "https://i.insider.com/5dd80df0fd9db206531bcd26?width=1100&format=jpeg&auto=webp",
            title: "Iphone 12"
        },
        {
            image: "https://i.ytimg.com/vi/FLS-jQ7d12I/maxresdefault.jpg",
            title: "PS 5"
        },
        {
            image: "https://cdn.dnaindia.com/sites/default/files/styles/full/public/2020/10/01/928513-apple-watch-series-6-and-apple-watch-se.jpg",
            title: "Apple Watch series 6"
        }
    ]
    return (
        <div >
            <Banner/>
        <div className="col-xl-12">
        <h5 className="pl-3">Latest</h5>

        <div class="row row-cols-1 row-cols-md-3 col-xl-9 float-left">
        
        {techNews.map(item => (
        <div class="col mb-4 articles-latest ">
        <hr className="bg-dark w-80"></hr>
        <div class="card h-100 my-2">
            
            <img src={item.image} class="card-img-top articles-img" alt="..."/>
            <div class="card-body">
            <h5 class="card-title">{item.title}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
        </div>
        </div>
        ))
        }
        </div>

        <div className="col-xl-3 float-right">
        
        <div class="card bg-primary text-white text-center p-3">
            <blockquote class="blockquote mb-0">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat.</p>
            <footer class="blockquote-footer text-white">
                <small>
                Someone famous in <cite title="Source Title">Source Title</cite>
                </small>
            </footer>
            </blockquote>
        </div>

        </div>     
        </div>
        </div>
    )
}

export default Articles
