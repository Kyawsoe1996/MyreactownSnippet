import React,{useContext} from 'react'
import {PostContext} from '../post/PostContext'
import Post from './Post'
function PostLists() {
    const posts = useContext(PostContext)
    
    return (
        
        
        <div>
            <div className="main-post">
                {posts.map(post => <Post key={post.id} post={post}/>)}
           </div>
        </div>
    )
}

export default PostLists
