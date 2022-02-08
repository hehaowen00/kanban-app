import { Fragment, KeyboardEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./styles/CardView.css";
import "./styles/Elements.css";
import TextareaAutosize from "react-autosize-textarea";

const MAX_TITLE_LENGTH = 1024;

function NewCardPanel() {
  const dispatch = useDispatch();

  const { listId } = useSelector((state: any) => state.panel);

  const [title, setTitle_] = useState("");
  const titleRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const titleBlur = (event: any) => {
    if (title.trim() === "") {
      setTitle_(title);
    }
  }

  const titleChange = (event: any) => {
    let cleaned = event.target.value.replace(/[\r\n]+/g, "");
    setTitle_(cleaned);
  };

  const titleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      titleRef.current?.blur();
    }
  };

  const close = () => {
    dispatch({ type: "CloseCardView" });
  };

  const addCard = () => {
    if (title !== "") {
      dispatch({ type: "NewCard", listId, card: { title } });
      setTitle_("");
      close();
    }
  };

  return (
    <div className="modal-view">
      <div className="modal-content">
        <TextareaAutosize
          ref={titleRef}
          rows={3}
          className="default font-90 font-600"
          maxLength={MAX_TITLE_LENGTH}
          onBlur={titleBlur}
          onChange={titleChange}
          onKeyPress={titleKeyPress}
          placeholder="New Card"
          value={title}
        />
        <div className="list-footer footer">
          <button
            className="default font-85 font-500"
            onClick={addCard}
          >
            Add Card
          </button>
          <button
            className="default font-85"
            onClick={close}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewCardPanel;
