import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import BlogPostDataService from "../services/BlogPostDataService";
import { LoginUserContext } from "../Main";

const ReplyCommentForm = (props) => {
  const [replies, setReplies] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [error, setError] = useState("");

  const loginUser = useContext(LoginUserContext);

  const handleSubmitReply = (e) => {
    e.preventDefault();
    if (loginUser.length > 0) {
      const reply_data = {
        reply_text: replyText,
        user: loginUser[0].id,
        comment: props.data.commentId,
      };

      BlogPostDataService.PostaReplyonAComment(
        props.data.postId,
        props.data.commentId,
        reply_data
      )
        .then((res) => {
          setReplies([...replies, res.data]);
          setReplyText("");
        })
        .catch((error) => {
          console.log(error);
        });
      // props.submitComment(e);
    } else {
      e.preventDefault();
      setError("You need to login to give the comments");
      setReplyText("");
    }
  };

  useEffect(() => {
    BlogPostDataService.getApostCommentAllReply(
      props.data.postId,
      props.data.commentId
    )
      .then((res) => {
        setReplies(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let ReplyDataLists = replies.map((reply) => (
    <div key={reply.id}>
      <div>
        <p>
          User:
          {
            props.data.allusersList.filter((u) => u.id === reply.user)[0].user
              .username
          }
        </p>
        <p>Reply:{reply.reply_text}</p>
      </div>
    </div>
  ));
  return (
    <div>
      <span className="text text-danger"> {error}</span>
      {replies.length > 0 ? (
        <div>
          {ReplyDataLists}
          <form action="">
            <input
              className="comment-input"
              type="text"
              placeholder="Reply to a comment"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <button
              className="btn btn-primary btn-sm"
              onClick={handleSubmitReply}
            >
              <FontAwesomeIcon
                style={{ height: "40px", width: "40px" }}
                icon={faArrowAltCircleRight}
              />
            </button>
          </form>
        </div>
      ) : (
        <form action="">
          <input
            className="comment-input"
            type="text"
            placeholder="Reply to a comment"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <button
            className="btn btn-primary btn-sm"
            onClick={handleSubmitReply}
          >
            <FontAwesomeIcon
              style={{ height: "40px", width: "40px" }}
              icon={faArrowAltCircleRight}
            />
          </button>
        </form>
      )}
    </div>
  );
};

export default ReplyCommentForm;
