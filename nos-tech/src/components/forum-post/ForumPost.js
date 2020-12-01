import React from 'react'
import './forum-post.css'
import { Card, Button, Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import { render } from '@testing-library/react';


// const ForumPost = () => {
//     return (
//         <Card className="forum-body-test">
//             <Card.Header>Emri Mbiemri</Card.Header>
//             <Card.Body>
//                 <Card.Title>Special title treatment</Card.Title>
//                 <Card.Text>
//                     With supporting text below as a natural lead-in to additional content.
//                 </Card.Text>
//             </Card.Body>
//         </Card>
//     )
// }



const ForumPost = () => {
    const forumContent = [
        {
            userProfilePicture: require("../../assets/images/avatar1.png"),
            userName: 'Valon Gazuzi',
            postStatus: 'posted 3h ago',
            postComposition: 'ktu tash munet me pas foto sene vene etj etj',
        },
        {
            userProfilePicture: require("../../assets/images/avatar3.png"),
            userName: 'Robert Panderaj',
            postStatus: 'posted 69min ago',
            postComposition: 'ktu tash munet me pas foto sene vene etj etj',
        },
        {
            userProfilePicture: require("../../assets/images/avatar7.png"),
            userName: 'Refren Vargjaj',
            postStatus: 'posted yesterday 4:20am',
            postComposition: 'ktu tash munet me pas foto sene vene etj etj',
        },
        {
            userProfilePicture: require("../../assets/images/avatar8.png"),
            userName: 'Mukades Desivojca',
            postStatus: 'posted 24h ago',
            postComposition: 'ktu tash munet me pas foto sene vene etj etj',
        },
        {
            userProfilePicture: require("../../assets/images/avatar2.png"),
            userName: 'Ferdez Myendraj',
            postStatus: 'posted about a weeek agooo',
            postComposition: 'ktu tash munet me pas foto sene vene etj etj',
        },
    ];

    const renderForumPost = (forumItem, index) => {
        return (
            <Card key={index} className="forum-item">
                <Card.Header>
                    <Card.Img
                        className="forum-profile-pic"
                        src={forumItem.userProfilePicture}
                    />
                    <div className="forum-text">
                        <Card.Title>{forumItem.userName}</Card.Title>
                        <Card.Text>{forumItem.postStatus}</Card.Text>
                    </div>
                </Card.Header>
                <Card.Body>

                    <Card.Text>
                        {forumItem.postComposition}
                    </Card.Text>
                </Card.Body>

                <Card.Body className="forum-button-body">
                    <div className="forum-post-button">
                        <div>
                            <Button title="UpVote" className="upvote-button"><i className="fas fa-chevron-up"></i></Button>
                            <Button title="DownVote" className="downvote-button"><i className="fas fa-chevron-down"></i></Button>
                            <Button title="Comment" className="comment-button"><i className="fas fa-comment"></i></Button>
                        </div>
                        <div className="share-more">
                            <Button title="Share" className="share-button"><i className="fas fa-share"></i></Button>
                            <Button title="More" className="more-button"><i className="fas fa-ellipsis-v"></i></Button>
                        </div>
                    </div>

                </Card.Body>
            </Card >
        )
    }
    return <div className="forum-card">
        {forumContent.map(renderForumPost)}
    </div>;
}

export default ForumPost





// function ForumPost() {
//     const forumContent = [
//         {
//             userProfilePicture: require("../../assets/images/avatar1.png"),
//             userName: "Erjon Parashumti",
//             postStatus: 'posted 3h ago',
//             postContent: 'images and text'
//         }
//     ]
// }
// export default ForumPost

