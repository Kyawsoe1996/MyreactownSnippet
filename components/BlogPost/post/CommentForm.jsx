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

const CommentForm = (props) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  const handleHideComment = () => {
    props.hideComment();
  };

  const loginUser = useContext(LoginUserContext);
  const handleSubmitComment = (e) => {
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
  };

  useEffect(() => {
    BlogPostDataService.getPostAllComments(props.postId)
      .then((res) => {
        console.log(res.data);
        setComments(res.data);
        console.log("GETTING DATA BACK from comments");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let commentDataLists = comments.map((c) => (
    <div key={c.id}>
      <div className="comment-form">
        {/* ........... */}

        <div className="img-logo">
          <img className="logo-img" src={logo} />
        </div>
        <div className="comment-part">
          <div className="comment-text">
            <p>
              {c.user}
              <span className="text-primary">
                <FontAwesomeIcon icon={faDotCircle} />
              </span>
              <span className="text-primary">Follow</span>
            </p>
            <p>{c.comment_text}</p>
          </div>
          <div className="reaction-time">
            <span>7m</span>
            <span>Like</span>
            <span>Reply</span>
            <span>10</span>
          </div>
        </div>
        {/* ........... */}
      </div>
    </div>
  ));

  return (
    <div>
      <span className="text text-primary" onClick={handleHideComment}>
        {" "}
        <FontAwesomeIcon icon={faWindowClose} />{" "}
      </span>
      {comments.length > 0 ? (
        <div>
          {commentDataLists}

          <form action="">
            <input
              type="text"
              placeholder="Write a comment"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button
              className="btn btn-primary btn-sm"
              onClick={handleSubmitComment}
            >
              <FontAwesomeIcon icon={faArrowAltCircleRight} />
            </button>
          </form>
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
              type="text"
              placeholder="Write a comment"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button
              className="btn btn-primary btn-sm"
              onClick={handleSubmitComment}
            >
              <FontAwesomeIcon icon={faArrowAltCircleRight} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CommentForm;
