import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose,faComment,faHeart,faShare, faLink, faUser } from '@fortawesome/free-solid-svg-icons'
import { post } from 'jquery'
import { main } from '@popperjs/core'


function PostCommentLikeUsers() {
    const [users,setUser]= useState([
        {id:1,name:"Shamu",isLoggin:false},
        {id:2,name:"Krishan",isLoggin:true}
    ])
    const [posts,setPost] = useState([
        {id:1,title:"Django",description:"Web framework written in Python",likecount:0},
        {id:2,title:"Laravel",description:"PHP Written Framework",likecount:0},
        {id:3,title:"ROR",description:"Ruby on Rail Framework",likecount:0},
        {id:4,title:"Spring",description:"Java Framework for user advance enhancement",likecount:0}
    
    ])
    const[viewProduct,setviewProduct] = useState([])
    const[canView,setcanView] = useState(false)
   
    
    const   handleViewForm = (post) => {
       
        setviewProduct(post)
      
        setcanView(!canView)
      
    }
   
    const handleClose = () => {
        setcanView(!canView)
    }

    const  handleLikeCount = (post) => {
        
        let finalData = posts.map(function(p){
            if(p.id === post.id){
                p.likecount ++
                return post
            }
            return p

        })
        setPost(finalData)
        
       
    }
    
    return (
        <div>
            
            <div className="user">
               {users.filter(u => u.isLoggin === true).map(u => (<User key={u.id} user={u} />) )}
            </div>
           <div className="main-post">
            {posts.map(p => <Post key={p.id} post={p}  onViewForm={handleViewForm} />)}
           </div>
            <div className="view-form">
                <ViewForm post={viewProduct} 
                        isView={canView} 
                        onLikeCount={handleLikeCount} 
                        onClose={handleClose}  />
            </div>
           
        </div>
    )
}

export default PostCommentLikeUsers


const Post = (props) => {
    const [isView,setisView] = useState(false)
    const [post,setPost] = useState({id:props.post.id,title:props.post.title,description:props.post.description,likecount:props.post.likecount})
    const handleViewForm = (post) => {
        setisView(!isView)
        // console.log("On POST",post)
        props.onViewForm(post)
        
    }

    const handleClose = () => {
       setisView(!isView)
    }

   

    
        return(
            <div>
                <div className="post-item">
    
                    <h4>{post.title}</h4>
                    <p>{post.description}</p>
                    <button onClick={()=>handleViewForm(post)} className="view-btn">View</button>
                </div>
              
                
            </div>
            
        )
    

    
}

const ViewForm = (props) => {
   
    // const[likecount,setLikecount] = useState(0)
    const handleClose = () => {
       props.onClose()
    // console.log("Closing")
    }
    const handleLike = (post) => {
       

        props.onLikeCount(post)
       
        // setLikecount(likecount =>likecount +1)
    }
    const handleComment = () => {
        console.log("Comment")
    }

    const handleShare = () => {
        console.log("Shared")
    }
    if(props.isView){
        return (
   

               
                <div>
                     <p>{JSON.stringify(props.post)}</p>
                    <div className="close">
                    <p onClick={handleClose} ><FontAwesomeIcon icon={faWindowClose} /></p>
                    </div>
                    <form>
                            <h1>View Form</h1>
                            
                            <h3>{props.post.title}</h3>
                            <p>{props.post.description}</p>
                            <div className="like-comment-share">
                                <span  onClick={()=>handleLike(props.post)}> Like {props.post.likecount}<FontAwesomeIcon icon={faHeart} /></span>
                                <span  onClick={handleComment}>Comment<FontAwesomeIcon icon={faComment} /></span>
                                <span onClick={handleShare}>Share<FontAwesomeIcon icon={faShare} /></span>
                            </div>
            
                    </form>
                </div>
           
            )
        }else {
            return (
                <div>
                   <p>Click View To Edit</p> 
                </div>
            )
        }

    
        
   
    
}

const User =(props) => {
   const[user,setUser] = useState({id:props.user.id,name:props.user.name,isLoggin:props.user.isLoggin})
    return (
        <div>
         
            <p><span><FontAwesomeIcon icon={faUser} /></span>{user.name}</p>
        </div>
    )
}


