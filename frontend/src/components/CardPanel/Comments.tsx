import { ChangeEvent, useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-autosize-textarea";
import "../styles/Comments.css";

import { useDispatch } from "react-redux";
import { NewComment } from "../../redux/Creators";

function Comments({ cardId, comments }: any) {
  const dispatch = useDispatch();

  const ref = useRef<any>(null);

  const [visible, setVisible] = useState(false);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (visible) {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }
  });

  const addComment = () => {
    let action = NewComment("testing", cardId, comment.trim());
    dispatch(action);
  };

  const onBlur = () => {
    if (comment.length === 0) {
      setVisible(false);
    }
  };

  const onFocus = () => {
    setVisible(true);
  };

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const addClick = () => {
    if (comment.trim().length > 0) {
      addComment();
    }
    setComment("");
    setVisible(false);
  }

  const cancel = () => {
    setComment("");
    setVisible(false);
  };

  const comments_ = comments.map((comment: any) => {
    let date = new Date(comment.timestamp);
    let str = date.toLocaleTimeString("en-AU", { hour12: false }) + " " + date.toLocaleDateString();
    return {
      ...comment,
      timestamp: str,
    };
  });

  return (
    <div className="comments block text-left">
      <div className="font-90 font-600 noselect text-left">
        Comments
      </div>
      <div className="comment-view mt-5">
        {comments_.map((comment: any, index: number) => 
          <div key={index} className="comment bg-white br-3 shadow">
            <div className="header font-85">
              <span className="font-600">User: </span>
              {comment.userId}
              <span className="f-right font-600">
                {comment.timestamp}
              </span>
            </div>
            <div className="body flex font-85">
              {comment.text}
            </div>
          </div>
        )}
      </div>
      <div className="block">
        <TextareaAutosize
          className="default font-85 font-500 shadow"
          placeholder="New Comment"
          maxLength={512}
          rows={visible ? 3 : undefined}
          value={comment}

          onBlur={onBlur}
          onFocus={onFocus}
          onChange={onChange}
        />
      </div>
      {visible && (
        <div ref={ref} className="menu spaced-right text-right">
          <button
            className="default shadow"
            onClick={addClick}
          >
            Save
          </button>
          <button
            className="default shadow"
            onClick={cancel}
           >
             Cancel
           </button>
        </div>
      )}
    </div>
  );
}

export default Comments;
