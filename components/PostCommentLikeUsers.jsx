import React, { Fragment, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose,faComment,faHeart,faShare, faLink, faUser, faStickyNote, faArrowCircleDown, faDotCircle, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'
import { post } from 'jquery'
import { main } from '@popperjs/core'
import logo from '../logo.png'

function PostCommentLikeUsers() {
    const [users,setUser]= useState([
        {id:1,name:"Shamu",isLoggin:true},
        {id:2,name:"Krishan",isLoggin:false}
    ])

    
    
    const [posts,setPost] = useState([
        {id:1,title:"Django",description:"Web framework written in Python",likecount:1,
        likeby:[{id:1,name:"Shamu",isLoggin:true}],
        comments:[
            {user:{id:1,name:"Shamu",isLoggin:true},commentText:"This is djanog"}
          
        ]},
        {id:2,title:"Laravel",description:"PHP Written Framework",likecount:0,likeby:[],comments:[]},
        {id:3,title:"ROR",description:"Ruby on Rail Framework",likecount:0,likeby:[],comments:[]},
        {id:4,title:"Spring",description:"Java Framework for user advance enhancement",likecount:1,likeby:[ {id:2,name:"Krishan",isLoggin:true}], comments:[
            {user:{id:2,name:"Krishan",isLoggin:false},commentText:"Spring Nice"}
          
        ]}
    
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

    const  handleLikeCount = (post,user) => {
        console.log("user",user,"Main")
       
        let finalData = posts.map(function(p){
            if(p.id === post.id){
                
                const getUser = user[0]
               
                p.likecount ++
                p.likeby=[...p.likeby,getUser]
                return post
            }
            return p

        })
        setPost(finalData)
        
       
    }


    const handleCommentSumbit = (commentData) =>{
       


        let finalData = posts.map(function(p){
            if(p.id === commentData.post.id){
               p.comments = [...p.comments,commentData.comments[0]]
              
                return p
                
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
                        onClose={handleClose}
                        user={users.filter(u => u.isLoggin === true)}
                        onComment={handleCommentSumbit}  />
            </div>
           
        </div>
    )
}

export default PostCommentLikeUsers


const Post = (props) => {
    // console.log(props,"Props on Post")
    const [isView,setisView] = useState(false)
    const [post,setPost] = useState({id:props.post.id,title:props.post.title,description:props.post.description,likecount:props.post.likecount,likeby:props.post.likeby,comments:props.post.comments})
    
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
                    <button onClick={()=>handleViewForm(props.post)} className="view-btn">View</button>
                </div>
              
                
            </div>
            
        )
    

    
}

const ViewForm = (props) => {
    const [isCommentshow,setIscommentShow] = useState(false)
    // const[likecount,setLikecount] = useState(0)
    const handleClose = () => {
       props.onClose()
    // console.log("Closing")
    }
    const handleLike = (post,user,e) => {
        e.preventDefault()
        props.onLikeCount(post,user)
       
        // setLikecount(likecount =>likecount +1)
    }
    const handleComment = (post,user,e) => {
        setIscommentShow(!isCommentshow)
        e.preventDefault()
        


    }

    const handleShare = () => {
        console.log("Shared")
    }
    const handleCommentSumbit = (commentData) =>{
       
        props.onComment(commentData)
    }
   
    if(props.isView){
        // const apk = props.post.likeby.filter(u => u.id === props.user[0].id).length
        // console.log(apk)
        //    if(props.post.likeby.length >=1 ){
               
        //         const dataMap = props.post.likeby.map(u => u.id === props.user[0].id)
        //         const dataFilter = props.post.likeby.filter(u => u.id === props.user[0].id).length
        //         console.log(dataFilter)
        //         console.log(dataMap)
        //        props.user[0] in props.post.likeby
        //    }
     
        return (


               
                <div>
                     
                    <div className="close">
                    <p onClick={handleClose} ><FontAwesomeIcon icon={faWindowClose} /></p>
                    </div>
                    <form>
                            
                            <p>Give Like Comment and Share for the post as u  like
                                dkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
                                ddddddddddddd
                            </p>
                            <h3>{props.post.title}</h3>
                            <p>{props.post.description}</p>
                            <div className="like-comment-share">
                                {/* //checking condition */}
                               { props.post.likeby.filter(user => user.id === props.user[0].id).length >0 ? (
                                   <button disabled  className="some-class"  
                                   onClick={(e)=>handleLike(props.post,props.user,e)}> Like {props.post.likecount} 
                                   <span className="text text-danger like-btn"><FontAwesomeIcon icon={faHeart} /></span>
                                   </button>
                                ): 
                                    <button   className="some-class"  
                                    onClick={(e)=>handleLike(props.post,props.user,e)}> Like {props.post.likecount} 
                                    <span className="lovereact"><FontAwesomeIcon icon={faHeart} /></span></button>
                                }
                               
                                <span  onClick={(e)=>handleComment(props.post,props.user,e)}>Comment<FontAwesomeIcon icon={faComment} /></span>
                                {isCommentshow ? (
                                    <CommentForm post={props.post} user={props.user} onComment={handleCommentSumbit}/>
                                ):null}
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


const CommentForm =(props) => {
   
    const[commentText,setCommentText] = useState('')

  
    const handleCommentSumbit = (e) =>{
        e.preventDefault()
       
        const commentData= {
            post:props.post,
            comments:[
                {user:props.user[0],commentText:commentText}
            ]
        }
        props.onComment(commentData)
        setCommentText('')
       
    }
    // comments:[
    //     {user:{id:1,name:"Shamu",isLoggin:true},commentText:"This is djanog"}
      
    // ]
   
    let CommentDataList = props.post.comments.map(c =>
                      <div>
                          <div className="comment-form">
                            {/* ........... */}
                            
                            <div className="img-logo">
                                <img className="logo-img" src={logo} />
                            </div>
                            <div className="comment-part">
                                <div className="comment-text">
                                    <p>{c.user.name} <span className="text-primary">< FontAwesomeIcon icon={faDotCircle }/></span> <span className="text-primary">Follow</span></p>
                                    <p>{c.commentText}</p>
                                </div>
                                <div  className="reaction-time">
                                    <span>7m</span>
                                    <span>Like</span>
                                    <span>Reply</span>
                                    <span>10</span>

                                </div>
                            </div>
                            {/* ........... */}
                   
                    
                    
                            </div>
                      </div>  
                    )
    
    

    
    return(
        <div>
            {props.post.comments.length > 0?(
                
                <div>
                {CommentDataList}
                
                <form action="">
                        <input type="text" placeholder="Write a comment" value={commentText} onChange={(e)=>setCommentText(e.target.value )} /> 
                        <button onClick={handleCommentSumbit} className="btn btn-primary btn-sm"><FontAwesomeIcon icon={faArrowAltCircleRight}/></button>
                </form>
                </div>
                

                
                
            ):(
                <div>
                     
                    <span>No comment to show</span>
                    <p>Be the first to Comment</p>
                    <form action="">
                        <input type="text" placeholder="Write a comment" value={commentText} onChange={(e)=>setCommentText(e.target.value )} /> 
                        <button onClick={handleCommentSumbit} className="btn btn-primary btn-sm"><FontAwesomeIcon icon={faArrowAltCircleRight}/></button>
                    </form>
                </div>
                
                
                )}
        </div>
        
    )
}

