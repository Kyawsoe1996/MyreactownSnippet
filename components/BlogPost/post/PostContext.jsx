import React,{useState,createContext} from 'react'

export const PostContext = createContext()

export const PostProvider = (props) => {
    const [post,setPost] = useState([
        {
            title:"Django ",
            description:"Django Web Framework",

        }
    ])
   

    return (
        <PostContext.Provider value={post}>
            {props.children}
        </PostContext.Provider>   
    )
}
