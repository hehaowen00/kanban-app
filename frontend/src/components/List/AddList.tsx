import {
  ReactElement,
  ChangeEvent,
  ClipboardEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import TextareaAutosize from "react-autosize-textarea";
import { useDispatch } from "react-redux";

import { newList } from "../../redux/Reducers/Board";
import { MAX_LIST_TITLE_LENGTH } from "../../types/Limits";

import "../../styles/AddList.css";

function AddList(): ReactElement {
  const dispatch = useDispatch();

  const [toggle, setToggle] = useState(false);
  const [name, setName] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (toggle) {
      containerRef.current?.scrollIntoView({ behavior: "auto", block: "end" });
      setTimeout(() => {
        inputRef.current?.focus();
      }, 500);
    }
  });

  const onClick = () => {
    setToggle(!toggle);
  };

  const onPaste = (event: ClipboardEvent) => {
    const append = event.clipboardData.getData("text");
    setName(name + append);
  };

  const onUpdate = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setName(event.target.value);
  };

  const addList = () => {
    if (name !== "") {
      dispatch(newList({ name }));
      setName("");
    }
  };

  const cancelNewList = () => {
    setName("");
    setToggle(false);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      setToggle(false);
    }
  };

  const onKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addList();
    }
  };

  let classes = `bg-white br-3 block font-90 font-600 shadow ${toggle ? "active add" : "add-list"}`;

  let listColClasses = `add-col ${toggle ? "z-2" : ""}`;

  return (
    <>
      {toggle && <div className="card-view-cover bg-none" onClick={cancelNewList}></div>}
      <div
        ref={containerRef}
        className={listColClasses}
      >
        <div
          className={classes}
          onClick={toggle ? undefined : onClick}
        >
          {!toggle && (
            <div className="flat mb-0 font-85 font-500 no-select">
              Add List
            </div>
          )}
          {toggle && (
            <>
              <TextareaAutosize
                ref={inputRef}
                className="default textarea-card font-85 no-select focus:bg-white"
                maxLength={MAX_LIST_TITLE_LENGTH}
                placeholder="Title"
                value={name}

                onChange={onUpdate}
                onKeyDown={onKeyDown}
                onKeyPress={onKeyPress}
                onPaste={onPaste}
              />
              <div className="menu mb-0 mt-1 no-select spaced-right text-right">
                <button
                  className="btn-blue"
                  onClick={addList}
                >
                  Add List
                </button>
                <button
                  className="btn-gray"
                  onClick={cancelNewList}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default AddList;
