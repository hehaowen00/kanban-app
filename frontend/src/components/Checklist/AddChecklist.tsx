import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import TextareaAutosize from "react-autosize-textarea";
import { NewChecklist } from "../../redux/Creators";

const MAX_CHECKLIST_TITLE_LENGTH = 128;

function AddChecklist ({ cardId, close }: any) {
  const dispatch = useDispatch(); 
  const [title, setTitle] = useState("");

  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (ref.current !== null) {
      ref.current?.focus();
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
    <div className="outset component checklists">
      <TextareaAutosize
        ref={ref}
        className="default font-85 font-600 margin-0"
        maxLength={MAX_CHECKLIST_TITLE_LENGTH}
        placeholder="New Checklist"
        value={title}

        onChange={titleChange}
        onKeyPress={titleKeyPress}
      />
      <div className="menu menu-mr-b">
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
  );
}

export default AddChecklist;
