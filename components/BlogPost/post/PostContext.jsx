import React,{useState,createContext,useEffect} from 'react'
import BlogPostDataService from '../services/BlogPostDataService'
export const PostContext = createContext()


export const PostProvider = (props) => {
    const [posts,setPosts] = useState([])
    const [users,setUsers] = useState([])

    useEffect(()=> {
        BlogPostDataService.getAllPosts().then(res => {
           
            setPosts(res.data)

        }).catch(err  => [
            console.log(err)
        ])

    },[])

    useEffect(()=> {
        BlogPostDataService.getAllUsers().then(res => {
           
            setUsers(res.data)

        }).catch(err  => [
            console.log(err)
        ])

    },[])

    const userNpostData = {
        users:users,
        posts:posts,
    }

   
    
    return (
        <PostContext.Provider value={userNpostData}>
            {props.children}
        </PostContext.Provider>   
    )
}
