import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TextareaAutosize from "react-autosize-textarea";

import { MAX_TITLE_LENGTH } from "../../types/Limits";
import { NewCard } from "../../redux/Creators";

import "../../Styles/AddCard.css";

function AddCard({ listId, close, listRef }: Props) {
  const dispatch = useDispatch();

  const [title, setTitle_] = useState("");
  const titleRef = useRef<HTMLTextAreaElement>(null);

  const scrollTo = () => {
    setTimeout(() => {
      titleRef.current?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        titleRef.current?.focus();
      }, 300)
    })
  };

  useEffect(() => {
    if (listRef) {
      listRef.current?.scrollIntoView({});
      scrollTo();
    }
  }, []);

  const addCard = () => {
    if (title.trim() !== "") {
      let value = title.trim().replaceAll('\n', ' ').substring(0, MAX_TITLE_LENGTH);
      let action = NewCard(listId, value);
      dispatch(action);
      setTitle_("");
    }
  };

  const onClose = () => {
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

  const titleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addCard();
      scrollTo();
    }
    if (event.key === "Escape") {
      close();
    }
  };

  return (
    <>
      <div className="card-view-cover" onClick={onClose}>
      </div>
      <div className="card mt-1 no-pad bg-white br-3 flex flex-1 flex-col shadow z-2">
        <TextareaAutosize
          ref={titleRef}
          rows={5}
          className="default no-bdr font-85 px-2 py-1"
          maxLength={MAX_TITLE_LENGTH}
          onBlur={titleBlur}
          onChange={titleChange}
          onKeyUp={titleKeyDown}
          placeholder="New Card"
          value={title}
        />
      </div>
      <div className="inline mt-1 ml-2 spaced-right text-right z-2">
        <button
          className="text-white bg-sky-600 hover:bg-sky-700 rounded px-3 py-1"
          onClick={addCard}
        >
          Save
        </button>
        <button
          className="text-slate-700 px-3 py-1 rounded hover:bg-slate-700 hover:text-white"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </>
  );
}

type Props = {
  listId: string,
  close: () => void,
  listRef: any,
};

export default AddCard;
