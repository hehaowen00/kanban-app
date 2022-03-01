import {
  ReactElement,
  ChangeEvent,
  ClipboardEvent,
  Fragment,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import TextareaAutosize from "react-autosize-textarea";
import { useDispatch } from "react-redux";
import { NewList } from "../redux/Creators";
import { MAX_LIST_TITLE_LENGTH } from "../types/Limits";

import "./styles/AddList.css";

function AddListView(): ReactElement {
  const dispatch = useDispatch();

  const [toggle, setToggle] = useState(false);
  const [name, setName] = useState("");

  let containerRef = useRef<HTMLDivElement>(null);
  let inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (toggle) {
      containerRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
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
      dispatch(NewList(name));
      setName("");
    }
  }

  const cancelNewList = () => {
    setName("");
    setToggle(false);
  }

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

  let classes = `bg-white br-3 block font-90 font-600 shadow ${toggle ? "active add": "add-list"}`;

  let listColClasses = `add-col ${toggle ? "z-2" : ""}`;

  return (
    <Fragment>
    {toggle &&  <div className="card-view-cover bg-none" onClick={cancelNewList}></div> }
    <div
      ref={containerRef}
      className={listColClasses}
    >
      <div
        className={classes}
        onClick={toggle ? undefined : onClick }
      >
        {!toggle && (
          <div className="flat mb-0 no-select">
            Add List
          </div>
        )}
        {toggle && (
          <Fragment>
            <TextareaAutosize
              ref={inputRef}
              className="default textarea-card font-90 no-select"
              maxLength={MAX_LIST_TITLE_LENGTH}
              placeholder="Title"
              value={name}

              onChange={onUpdate}
              onKeyDown={onKeyDown}
              onKeyPress={onKeyPress}
              onPaste={onPaste}
            />
            <div className="menu mb-0 mt-5 no-select spaced-right text-right">
              <button
                className="default"
                onClick={addList}
              >
                Save
              </button>
              <button
                className="default"
                onClick={cancelNewList}
              >
                Cancel
              </button>
            </div>
          </Fragment>
        )}
      </div>
    </div>
    </Fragment>
  );
}

export default AddListView;
