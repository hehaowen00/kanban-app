import { ChangeEvent,KeyboardEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TextareaAutosize from "react-autosize-textarea";

import { MAX_TITLE_LENGTH } from "../types/Limits";
import { NewCard } from "../redux/Creators";

import Outside from "./Outside";

import "./styles/AddCard.css";

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
      addCard();
    }
  };

  return (
    <div className="modal-view">
      <Outside className="modal-content flex flex-1 flex-col" update={close}>
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
        <div className="menu mt-5 noselect spaced-right text-right">
          <button
            className="default font-85"
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
      </Outside>
    </div>
  );
}

export default AddCard;
