import { ReactElement, KeyboardEvent, useEffect, useState, Key } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./styles/CardView.css";
import "./styles/Elements.css";
import TextareaAutosize from "react-autosize-textarea";

const MAX_TITLE_LENGTH = 1024;
const MAX_DESCRIPTION_LENGTH = 2048;
const MAX_COMMENT_LENGTH = 1024;

function CardPanel() {
  const dispatch = useDispatch();

  const cardView = useSelector((state: any) => { return { ...state.cardView } });
  const { inputs, currentCardId, currentListId, isNewCard, visible } = cardView;

  const { title, description } = useSelector((state: any) => {
    return state.board.cards[currentCardId];
  });

  const [title_, setTitle_] = useState(title);
  const [desc_, setDesc_] = useState(description);

  const titleChange = (event: any) => {
    let cleaned = event.target.value.replace(/[\r\n]+/g, "");
    setTitle_(cleaned);
  };

  const titleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const descChange = (event: any) => {
    let cleaned = event.target.value.replace(/[\r\n]+/g, "");
    setDesc_(cleaned);
  };

  const descKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <div
      className="list card-view"
      style={{ display: visible ? "block" : "none" }}
    >
      <TextareaAutosize
        className="textarea"
        maxLength={MAX_TITLE_LENGTH}
        onChange={titleChange}
        onKeyPress={titleKeyPress}
        placeholder="Title"
        value={title_}
      />
      <TextareaAutosize
        className="textarea"
        maxLength={MAX_TITLE_LENGTH}
        onChange={descChange}
        onKeyPress={descKeyPress}
        placeholder="Description"
        rows={4}
        value={desc_}
      />
      <div className="toolbar">
        <button className="first">Attachment</button>
        <button>Checklist</button>
        <button>Due Date</button>
        <button className="last">Label</button>
      </div>
    </div>
  );
}

export default CardPanel;
