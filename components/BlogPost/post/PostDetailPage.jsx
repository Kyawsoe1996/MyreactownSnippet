import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostContext } from "./PostContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoginUserContext } from "../Main";

import {
  faWindowClose,
  faComment,
  faHeart,
  faShare,
  faLink,
  faUser,
  faStickyNote,
  faArrowCircleDown,
  faDotCircle,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import BlogPostDataService from "../services/BlogPostDataService";
import CommentForm from "./CommentForm";

export const SingPostContext = React.createContext();
function PostDetailPage() {
  const [post, setPost] = useState([]);
  const [userLikeby, setUserLikeBy] = useState([]);
  const [error, setError] = useState("");
  const [isclickComment, setIsClickComment] = useState(false);

  const { postId } = useParams();

  const posts = useContext(PostContext);

  useEffect(() => {
    console.log("Use Effect on Post Detail Page");
    BlogPostDataService.getPostDetail(parseInt(postId))

      .then((res) => {
        setPost(res.data);

        setUserLikeBy(res.data.like_by);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const loginUser = useContext(LoginUserContext);

  const handleLike = (e) => {
    e.preventDefault();
    //if only user login, then can like
    if (loginUser.length > 0) {
      const post_data = {
        user: loginUser[0].id,
      };
      BlogPostDataService.likePost(parseInt(postId), post_data)
        .then((res) => {
          if (res.data["success"]) {
            BlogPostDataService.getPostDetail(parseInt(postId))

              .then((res) => {
                setPost(res.data);
                setUserLikeBy(res.data.like_by);
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setError("You need to login first to give reaction");
    }
  };

  const handleComment = (e) => {
    e.preventDefault();
    setIsClickComment(!isclickComment);

    console.log("Comment Form Btn clicked");
  };

  const handleHideComment = () => {
    setIsClickComment(!isclickComment);
    console.log("Hide COmment");
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    //it is just using for preventDefault,,Not going to another page i mean url/?
    //all the logic on submit comment is done on commentForm.jsx
    //first it think it will in herepostdetailpage
  };

  const lg = loginUser.length > 0 ? loginUser[0].id : null;
  // this take me 4hour at least to find , i just use normal length without state

  const IsuserLike = userLikeby.filter((u) => u === lg);

  //const BtnColr = userLikeby.indexOf(lg) === 1 ? 'btn btn-danger disabled':''
  const BtnColr = IsuserLike.length > 0 ? "" : "";

  return (
    <div>
      <span className="text text-danger">{error}</span>
      {isclickComment ? null : (
        <form id="myForm">
          <h1> {post.title} </h1>
          <p>{post.description}</p>

          <div className="like-comment-share">
            {IsuserLike.length > 0 ? (
              <button onClick={handleLike} className={BtnColr} disabled>
                <span className=" text text-danger lovereact">
                  <FontAwesomeIcon icon={faHeart} />
                </span>
                Like {post.post_likes_count}
              </button>
            ) : (
              <button onClick={handleLike} className={BtnColr}>
                <span>
                  <FontAwesomeIcon icon={faHeart} />
                </span>
                Like {post.post_likes_count}
              </button>
            )}
            <button onClick={handleComment}>
              Comment
              <span>
                <FontAwesomeIcon icon={faComment} />
              </span>
            </button>
            <button>
              Share
              <span>
                <FontAwesomeIcon icon={faShare} />
              </span>
            </button>
          </div>
        </form>
      )}

      {isclickComment ? (
        <CommentForm
          submitComment={handleSubmitComment}
          postId={parseInt(postId)}
          hideComment={handleHideComment}
        />
      ) : null}
    </div>
  );
}

export default PostDetailPage;
