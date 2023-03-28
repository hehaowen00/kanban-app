import { ChangeEvent, useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-autosize-textarea";
import { useDispatch } from "react-redux";
import ReactMarkdown from 'react-markdown';
import { HrRender, LinkRender, QuoteRender } from "../../utils/Markdown";

import { Comment } from "../../Types/Kanban";

import { NewComment } from "../../redux/Creators";

import "../../styles/Comments.css";

function Comments({ cardId, comments }: Props) {
  const dispatch = useDispatch();

  const ref = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(false);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (visible) {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }
  });

  const addComment = () => {
    let action = NewComment("Testing", cardId, comment);
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

  const comments_ = comments.map((comment: Comment) => {
    let date = new Date(comment.timestamp);
    let str = date.toLocaleTimeString("en-AU", { hour12: false }) + " " + date.toLocaleDateString();
    return {
      ...comment,
      timestamp: str,
    };
  });

  return (
    <div className="comments block text-left">
      <div className="font-90 font-500 no-select text-left">
        Comments
      </div>
      <div className="comment-view">
        {comments_.map((comment: any, index: number) =>
          <div key={index} className="">
            <div className="header font-85">
              {comment.userId}
              <span className="f-right text-slate-400">
                {comment.timestamp}
              </span>
            </div>
            <div className="body mt-1 font-85 bg-white px-2 py-1 markdown drop-shadow" style={{ whiteSpace: 'pre-line' }}>
              <ReactMarkdown
                children={comment.text.replaceAll('\n', '  \n')}
                components={{ a: LinkRender, h1: 'p', h2: 'p', h3: 'p', hr: HrRender, blockquote: QuoteRender, }}
              />
            </div>
          </div>
        )}
      </div>
      <div className="block">
        <TextareaAutosize
          className="default font-85 font-500 drop-shadow"
          placeholder="Post Comment"
          maxLength={512}
          rows={visible ? 3 : 2}
          value={comment}

          onBlur={onBlur}
          onFocus={onFocus}
          onChange={onChange}
        />
      </div>
      {visible && (
        <div ref={ref} className="menu spaced-right text-right mb-0">
          <button
            className="bg-sky-600 text-white px-3 py-1 rounded hover:bg-sky-700"
            onClick={addClick}
          >
            Send
          </button>
          <button
            className="text-slate-700 px-3 py-1 bg-slate-300 rounded hover:bg-slate-700 hover:text-white"
            onClick={cancel}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export type Props = {
  cardId: string,
  comments: Comment[],
};

export default Comments;
