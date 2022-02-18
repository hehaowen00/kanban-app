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

import "./styles/AddList.css";

function AddList(): ReactElement {
  const dispatch = useDispatch();

  const [toggle, setToggle] = useState(false);
  const [name, setName] = useState("");

  let containerRef = useRef<any>(null);
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

  let classes = "list add-list bg-white font-90 font-600 shadow";

  if (toggle) {
    classes = classes + " active";
  }

  return (
    <div
      ref={containerRef}
      className="list-col"
    >
      <div
        className={classes}
        onClick={toggle ? undefined : onClick }
      >
        {!toggle && (
          <div className="list-header flat noselect">
            Add List
          </div>
        )}
        {toggle && (
          <Fragment>
            <TextareaAutosize
              ref={inputRef}
              className="list-header default textarea-card font-90 noselect"
              maxLength={255}
              placeholder="Title"
              value={name}

              onChange={onUpdate}
              onKeyDown={onKeyDown}
              onKeyPress={onKeyPress}
              onPaste={onPaste}
            />
            <div className="btn noselect">
              <button className="default" onClick={addList}>Add List</button>
              <button className="default" onClick={cancelNewList}>Cancel</button>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
}

export default AddList;
