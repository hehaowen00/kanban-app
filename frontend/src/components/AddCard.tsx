import { Fragment, ChangeEvent,KeyboardEvent, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import TextareaAutosize from "react-autosize-textarea";

import { MAX_TITLE_LENGTH } from "../types/Limits";
import { NewCard } from "../redux/Creators";

import "./styles/AddCard.css";

function AddCard({ listId, close }: any) {
  const dispatch = useDispatch();

  const [title, setTitle_] = useState("");
  const titleRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
    titleRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const addCard = () => {
    if (title !== "") {
      let action = NewCard(listId, title);
      dispatch(action);
      setTitle_("");
      close();
    }
  };

  const onClose = () => {
    console.log('close');
    close();
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
    <Fragment>
    <div className="card-view-cover" onClick={onClose}></div>
    <div className="card no-pad bg-white br-3 flex flex-1 flex-col shadow z-2">
      <TextareaAutosize
        ref={titleRef}
        rows={5}
        className="default no-bdr font-90"
        maxLength={MAX_TITLE_LENGTH}
        onBlur={titleBlur}
        onChange={titleChange}
        onKeyPress={titleKeyPress}
        placeholder="New Card"
        value={title}
      />
    </div>
    <div className="menu inline spaced-right text-right z-2">
      <button 
        className="default no-bdr shadow"
        onClick={addCard}
      >
        Save
      </button>
      <button
        className="default no-bdr shadow"
        onClick={onClose}
      >
        Cancel
      </button>
    </div>
    </Fragment>
  );
}

export default AddCard;
