import { useDispatch } from "react-redux";
import TextareaAutosize from "react-autosize-textarea";
import { ChangeEvent, useState } from "react";
import { NewComment } from "../../redux/Creators";

function Comments({ cardId, comments }: any) {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [comment, setComment] = useState("");

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
      <span className="font-90 font-600 text-left">
        Comments
      </span>
      <div className="comment-view">
        {comments.map((comment: any, index: number) => 
          <div key={index} className="comment">
            <div className="header"><b>User:</b> {comment.userId}</div>
            <div className="body">
            {comment.text}
            </div>
          </div>
        )}
      </div>
      <div className="textarea-100">
        <TextareaAutosize
          className="default font-85 font-500"
          placeholder="New Comment"
          maxLength={512}
          value={comment}

          onBlur={onBlur}
          onFocus={onFocus}
          onChange={onChange}
        />
      </div>
      {visible && (
        <div className="menu">
          <button
            className="default ml-5"
            onClick={addClick}
          >
            Add Comment
          </button>
          <button
            className="default ml-5"
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
