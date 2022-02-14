import { ChangeEvent,KeyboardEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TextareaAutosize from "react-autosize-textarea";

import { MAX_TITLE_LENGTH } from "../types/Limits";
import { NewCard } from "../redux/Creators";

import Outside from "./Outside";

function AddCard() {
  const dispatch = useDispatch();

  const { listId } = useSelector((state: any) => state.panel);

  const [title, setTitle_] = useState("");
  const titleRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const addCard = () => {
    if (title !== "") {
      let action = NewCard(listId, title);
      dispatch(action);
      setTitle_("");
      close();
    }
  };

  const close = () => {
    dispatch({ type: "CloseCardView" });
  };

  const titleBlur = () => {
    if (title.trim() === "") {
      setTitle_(title);
    }
  }

  const titleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    let { value } = event.target;
    setTitle_(value);
  };

  const titleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      titleRef.current?.blur();
    }
  };

  return (
    <div className="modal-view">
      <Outside update={close}>
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
      </Outside>
    </div>
  );
}

export default AddCard;
