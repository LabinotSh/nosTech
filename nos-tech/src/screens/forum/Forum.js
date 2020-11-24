import React from 'react'
import './forum.css'
import { Button } from "react-bootstrap";
import ForumPost from '../../components/forum-post/ForumPost';

function Forum() {
    return (
        <div className="forum-page">

            <div className="container">
                <div className="forum-top">
                    <div className="forum-top-text">
                        <h1>FORUM PART</h1>

                        <p>Welcome to the forum section where you can ask questions, share solutions, make connections with new people, share ideas, bring shit to life...</p>
                    </div>
                    <div className="forum-top-btn">
                        <Button className="post-btn">
                            Post something
                    </Button>

                    </div>
                </div>
            </div>

            <div className="forum-body">
                <div className="container">
                    <div className="forum-items">

                        <ForumPost />

                    </div>
                </div>

            </div>

        </div>
    )
}

export default Forum
