import React from 'react'
import { Link } from 'react-router-dom'



const  Post = ({post}) => {
    return (
        <div>
           <div className="post-item">
    
                <h4>{post.title}</h4>
               
               

               <Link to={`/posts/${post.id}`}>
                    <button className="view-btn">View</button>
                </Link>
            </div>

        </div>
    )
}

export default Post
