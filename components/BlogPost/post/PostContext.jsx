import React,{useState,createContext,useEffect} from 'react'
import BlogPostDataService from '../services/BlogPostDataService'
export const PostContext = createContext()

export const PostProvider = (props) => {
    const [posts,setPosts] = useState([])

    useEffect(()=> {
        BlogPostDataService.getAllPosts().then(res => {
           
            setPosts(res.data)

        }).catch(err  => [
            console.log(err)
        ])

    },[])
   
    
    return (
        <PostContext.Provider value={posts}>
            {props.children}
        </PostContext.Provider>   
    )
}
