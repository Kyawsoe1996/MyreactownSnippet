import React from 'react'
import { BrowserRouter as Router, Switch , Route } from 'react-router-dom'
import PostLists from './post/PostLists'
import PostAdd from './post/PostAdd'
import Post from './post/Post'
import {PostProvider} from './post/PostContext'

function Home() {
    return (
        <PostProvider>
            <div>
                <p>Home</p>
                <PostLists />
               
                

            </div>
        </PostProvider>
    )
}

export default Home
