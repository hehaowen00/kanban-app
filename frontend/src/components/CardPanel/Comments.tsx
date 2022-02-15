import { ChangeEvent, useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-autosize-textarea";

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

  return (
    <div className="comments">
      <div className="noselect font-90 font-600 text-left">
        Comments
      </div>
      <div className="comment-view">
        {comments.map((comment: any, index: number) => 
          <div key={index} className="shadowed comment">
            <div className="header"><b>User:</b> {comment.userId}</div>
            <div className="body">
            {comment.text}
            </div>
          </div>
        )}
      </div>
      <div className="textarea-100">
        <TextareaAutosize
          className="shadowed default font-85 font-500"
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
        <div ref={ref} className="menu">
          <button
            className="shadowed default ml-5"
            onClick={addClick}
          >
            Add Comment
          </button>
          <button
            className="shadowed default ml-5"
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
