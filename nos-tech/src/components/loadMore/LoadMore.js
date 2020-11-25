import React,{useState,useEffect} from 'react'

const LoadMore = ({loadMore}) => {
    

    return(
        <>
            <button onClick={() => loadMore()} 
            className="load-more-but mx-auto"
            >
                Load More
            </button>
        </>
    )
}

export default LoadMore