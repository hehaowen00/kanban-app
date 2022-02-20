import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import TextareaAutosize from "react-autosize-textarea";
import Outside from "../Outside";

import { NewChecklist } from "../../redux/Creators";
import { MAX_CHECKLIST_TITLE_LENGTH } from "../../types/Limits";

function AddChecklist ({ cardId, close }: any) {
  const dispatch = useDispatch(); 
  const [title, setTitle] = useState("");

  const containerRef = useRef<any>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current?.focus();
      containerRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

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
      <div ref={containerRef} className="add-checklist br-3 shadow">
        <TextareaAutosize
          ref={inputRef}
          className="default font-85 font-600 margin-0"
          maxLength={MAX_CHECKLIST_TITLE_LENGTH}
          placeholder="New Checklist"
          value={title}

          onChange={titleChange}
          onKeyPress={titleKeyPress}
        />
        <div className="menu mb-0 mt-5 spaced-right text-right">
          <button
            className="default"
            onClick={addList}
           >
             Add Checklist
           </button>
          <button
            className="default"
            onClick={cancelClick}
          >
            Cancel
          </button>
        </div>
      </div>
    </Outside>
  );
}

export default AddChecklist;
