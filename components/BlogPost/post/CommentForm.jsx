import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDotCircle,
  faArrowAltCircleRight,
  faWindowClose,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../../logo.png";
import BlogPostDataService from "../services/BlogPostDataService";
import { LoginUserContext } from "../Main";
import ReplyCommentForm from "./ReplyCommentForm";

const CommentForm = (props) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [error,setError] = useState("")
  const [isreply,setIsReply] = useState(false)
  //to pass which comment user reply in the ReplyCommentForm
  const [currentCommentId,setCurrentCommentId] = useState("")


  const handleHideComment = () => {
    props.hideComment();
  };

  const loginUser = useContext(LoginUserContext);
  const handleSubmitComment = (e) => {
    if(loginUser.length > 0){
      const comment_data = {
        comment_text: commentText,
        user: loginUser[0].id,
      };
      BlogPostDataService.PostComment(props.postId, comment_data)
        .then((res) => {
          setComments([...comments, res.data]);
          setCommentText("");
        })
        .catch((error) => {
          console.log(error);
        });
      props.submitComment(e);
    } else {
      e.preventDefault()
      setError("You need to login to give the comments")
      setCommentText("")
    }
    }
    
    const handleReply = (commentId) => {
      setCurrentCommentId(commentId)
      setIsReply(!isreply)
     
    }

  useEffect(() => {
    BlogPostDataService.getPostAllComments(props.postId)
      .then((res) => {
       
        setComments(res.data);
        
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //for providing data on reply form
    const to_reply_form ={
        postId:props.postId,
        commentId:parseInt(currentCommentId),
        allusersList:props.allusersList
    }

   

  let commentDataLists = comments.map((c) => (
    <div key={c.id}>
      <div className="comment-form">
        {/* ........... */}

        <div className="img-logo">
          <img className="logo-img" src={logo} />
        </div>
        <div className="comment-part">
          <div className="comment-text">
            {/* <div>{c.user}</div> */}
            <div>{props.allusersList.filter(user => user.id === c.user)[0].user.username }</div>
            <div>
              <span className="text-primary">
                <FontAwesomeIcon icon={faDotCircle} />
              </span>
              <span className="text-primary">Follow</span>
            </div>
          </div>
          <div>{c.comment_text}</div>
          <div className="reaction-time">
            
              
              <span>7m</span>
              <span>Like</span>
              <span onClick={()=>handleReply(c.id)}>Reply</span>
              
            
            
            
            {/* <span>10</span> */}
          </div>
          <div className="reply-form">
              
              {isreply && currentCommentId === c.id  ? <ReplyCommentForm data={to_reply_form}/> : null}
            </div>
        </div>
        {/* ........... */}
      </div>
      
    </div>
  ));
  
  
  return (
    <div>
      <span className="text text-danger"> {error}</span>
      <span className="text text-danger close" onClick={handleHideComment}>
        <FontAwesomeIcon icon={faWindowClose} />
      </span>
      {comments.length > 0 ? (
        <div>
          {commentDataLists}

          {isreply ? null : (
            <form action="">
            <input
              className="comment-input"
              type="text"
              placeholder="Write a comment"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button
              className="btn btn-primary btn-sm"
              onClick={handleSubmitComment}
            >
              <FontAwesomeIcon
                style={{ height: "40px", width: "40px"}}
                icon={faArrowAltCircleRight}
              />
            </button>
          </form>

          )}
        </div>
      ) : (
        <div>
          <p>
            <FontAwesomeIcon
              style={{ height: "200px", width: "200px", opacity: "7" }}
              icon={faComment}
            />
          </p>
          <p>Be the first to Comment</p>
          <form action="">
            <input
              className="comment-input"
              type="text"
              placeholder="Write a comment"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button className="btn btn-primary btn-sm" onClick={handleSubmitComment}>
              <FontAwesomeIcon style={{ height: "40px", width: "40px"}} icon={faArrowAltCircleRight} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CommentForm;
