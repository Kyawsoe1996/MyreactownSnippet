import React,{useContext} from 'react'
import {PostContext} from '../post/PostContext'
import Post from './Post'
function PostLists() {
    const posts = useContext(PostContext)
    //pass all users in each post,because we need to show username in commentForm
    //instead of id
    
    return (
        
        
        <div>
            <div className="main-post">
                {posts.posts.map(post => <Post key={post.id} post={post} users={posts.users}/>)}
           </div>
        </div>
    )
}

export default PostLists
