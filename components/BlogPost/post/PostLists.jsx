import React,{useContext} from 'react'
import {PostContext} from '../post/PostContext'
function PostLists() {
    const post = useContext(PostContext)
    
    return (
        <div>
            <h1>PostLists... {post[0].title}</h1>
        </div>
    )
}

export default PostLists
