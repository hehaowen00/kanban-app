import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TextareaAutosize from "react-autosize-textarea";

import { MAX_TITLE_LENGTH } from "../../types/Limits";
import { NewCard } from "../../redux/Creators";

import "../../Styles/AddCard.css";

function AddCard({ listId, close }: Props) {
  const dispatch = useDispatch();

  const [title, setTitle_] = useState("");
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useSelector(({ ui }: any) => { return ui.end; });

  useEffect(() => {
    // console.log(containerRef);
    containerRef.current?.scrollIntoView({ behavior: "auto" });
    titleRef.current?.focus();
    titleRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const addCard = () => {
    if (title.trim() !== "") {
      let action = NewCard(listId, title.trim());
      dispatch(action);
      setTitle_("");
      close();
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

  const titleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addCard();
    }
  };

  return (
    <>
      <div className="card-view-cover" onClick={onClose}></div>
      <div className="card no-pad bg-white br-3 flex flex-1 flex-col shadow z-2">
        <TextareaAutosize
          ref={titleRef}
          rows={5}
          className="default no-bdr font-85 px-2 py-1"
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
};

export default AddCard;
