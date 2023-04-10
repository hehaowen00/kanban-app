import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import TextareaAutosize from "react-autosize-textarea";
import Outside from "../../Outside";

import { MAX_CHECKLIST_TITLE_LENGTH } from "../../../types/Limits";
import { newChecklist } from "../../../redux/Reducers/Board";

function AddChecklist({ cardId, active, close }: Props) {
  const dispatch = useDispatch();

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [name, setName] = useState("");

  useEffect(() => {
    if (active) {
      inputRef.current?.focus();
      containerRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [active]);

  const titleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value.trim();
    if (value === "") {
      setName(value);
    }
  };

  const titleKeyUp = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Escape") {
      cancelClick();
    }
  };

  const titleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addList();
    }
  };

  const addList = () => {
    if (name.trim() !== "") {
      dispatch(newChecklist({ cardId, name }));
      setName("");
      close();
    }
  };

  const cancelClick = () => {
    setName("");
    close();
  };

  return (
    <Outside update={cancelClick}>
      <div
        ref={containerRef}
        className="mt-1 px-1.5"
      >
        <TextareaAutosize
          ref={inputRef}
          name="titleInput"
          className="checklist-title rounded default flex flex-col font-85 m-0 focus:drop-shadow"
          maxLength={MAX_CHECKLIST_TITLE_LENGTH}
          placeholder="New Checklist"
          value={name}
          spellCheck={false}
          onChange={titleChange}
          onKeyUp={titleKeyUp}
          onKeyPress={titleKeyPress}
        />
        <div className="menu mb-0 mt-1 spaced-right text-right">
          <button
            className="btn-blue"
            onClick={addList}
          >
            Add Checklist
          </button>
          <button
            className="btn-gray"
            onClick={cancelClick}
          >
            Cancel
          </button>
        </div>
      </div>
    </Outside>
  );
}

interface Props {
  active: boolean,
  cardId: string,
  close: () => void,
}

export default AddChecklist;
