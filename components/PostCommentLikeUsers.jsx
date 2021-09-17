import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose,faComment,faHeart,faShare, faLink, faUser } from '@fortawesome/free-solid-svg-icons'
import { post } from 'jquery'
import { main } from '@popperjs/core'


function PostCommentLikeUsers() {
    const [users,setUser]= useState([
        {id:1,name:"Shamu",isLoggin:true},
        {id:2,name:"Krishan",isLoggin:false}
    ])

    
    
    const [posts,setPost] = useState([
        {id:1,title:"Django",description:"Web framework written in Python",likecount:1,
        likeby:[{id:1,name:"Shamu",isLoggin:true}],
        comments:[
            {user:{id:1,name:"Shamu",isLoggin:true},commentText:"This is for  Django Comment"}
        ]},
        {id:2,title:"Laravel",description:"PHP Written Framework",likecount:0,likeby:[]},
        {id:3,title:"ROR",description:"Ruby on Rail Framework",likecount:0,likeby:[]},
        {id:4,title:"Spring",description:"Java Framework for user advance enhancement",likecount:1,likeby:[ {id:2,name:"Krishan",isLoggin:true}]}
    
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
                        user={users.filter(u => u.isLoggin === true)}  />
            </div>
           
        </div>
    )
}

export default PostCommentLikeUsers


const Post = (props) => {
    const [isView,setisView] = useState(false)
    const [post,setPost] = useState({id:props.post.id,title:props.post.title,description:props.post.description,likecount:props.post.likecount,likeby:props.post.likeby})
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
    const handleLike = (post,user,e) => {
        e.preventDefault()
        props.onLikeCount(post,user)
       
        // setLikecount(likecount =>likecount +1)
    }
    const handleComment = () => {
        console.log("Comment")
    }

    const handleShare = () => {
        console.log("Shared")
    }
    if(props.isView){
        const apk = props.post.likeby.filter(u => u.id === props.user[0].id).length
        console.log(apk)
           if(props.post.likeby.length >=1 ){
               
                const dataMap = props.post.likeby.map(u => u.id === props.user[0].id)
                const dataFilter = props.post.likeby.filter(u => u.id === props.user[0].id).length
                // console.log(dataFilter)
                // console.log(dataMap)
            //    props.user[0] in props.post.likeby
           }
     
        return (


               
                <div>
                     {/* <p>{JSON.stringify(props.post)}</p> */}
                    <div className="close">
                    <p onClick={handleClose} ><FontAwesomeIcon icon={faWindowClose} /></p>
                    </div>
                    <form>
                            
                            <p>Give Like Comment and Share for the post as u  like</p>
                            <h3>{props.post.title}</h3>
                            <p>{props.post.description}</p>
                            <div className="like-comment-share">
                                {/* //checking condition */}
                               { props.post.likeby.filter(user => user.id === props.user[0].id).length >0 ? (
                                   <button disabled  className="some-class"  
                                   onClick={(e)=>handleLike(props.post,props.user,e)}> Like {props.post.likecount} 
                                   <span className="text text-danger"><FontAwesomeIcon icon={faHeart} /></span>
                                   </button>
                                ): 
                                    <button   className="some-class"  
                                    onClick={(e)=>handleLike(props.post,props.user,e)}> Like {props.post.likecount} 
                                    <span className="lovereact"><FontAwesomeIcon icon={faHeart} /></span></button>
                                }
                               
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


