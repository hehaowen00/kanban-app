import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import TextareaAutosize from "react-autosize-textarea";
import Outside from "../../Outside";

import { NewChecklist } from "../../../redux/Creators";
import { MAX_CHECKLIST_TITLE_LENGTH } from "../../../types/Limits";

function AddChecklist({ cardId, active, close }: Props) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (active) {
      inputRef.current?.focus();
      containerRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [active]);

  const titleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    let { value } = event.target;
    if (value === "" || value.trim() !== "") {
      setTitle(value);
    }
  };

  const titleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addList();
    }
  };

  const addList = () => {
    if (title.trim() !== "") {
      dispatch(NewChecklist(cardId, title));
      setTitle("");
      close();
    }
  };

  const cancelClick = () => {
    setTitle("");
    close();
  };

  return (
    <Outside update={cancelClick}>
      <div
        ref={containerRef}
        className="mt-2"
      >
        <TextareaAutosize
          ref={inputRef}
          name="titleInput"
          className="checklist-title rounded default flex flex-col font-85 font-500 m-0 focus:drop-shadow"
          maxLength={MAX_CHECKLIST_TITLE_LENGTH}
          placeholder="Checklist"
          value={title}
          spellCheck={false}
          onChange={titleChange}
          onKeyPress={titleKeyPress}
        />
        <div className="menu mb-0 mt-5 spaced-right text-right">
          <button
            className="bg-sky-600 text-white px-3 py-1 rounded hover:bg-sky-700"
            onClick={addList}
          >
            Add Checklist
          </button>
          <button
            className="text-slate-700 px-3 py-1 bg-slate-300 rounded hover:bg-slate-700 hover:text-white"
            onClick={cancelClick}
          >
            Cancel
          </button>
        </div>
      </div>
    </Outside>
  );
}

type Props = {
  active: boolean,
  cardId: string,
  close: () => void,
};

export default AddChecklist;
