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
      containerRef.current?.scrollIntoView();
      inputRef.current?.focus();
    }
  }, [toggle]);

  const handleClick = () => {
    setToggle(!toggle);
  };

  const handlePaste = (event: ClipboardEvent) => {
    const append = event.clipboardData.getData("text");
    setName(name + append);
  };

  const handleUpdate = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setName(event.target.value);
  };

  const addList = () => {
    if (name !== "") {
      dispatch(NewList(name));
      setName("");
      setToggle(false);
    }
  }

  const cancelNewList = () => {
    setName("");
    setToggle(false);
  }

  const submitList = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addList();
    }
  };

  let classes = ["list", "add-list"];

  if (toggle) {
    classes.push("active");
  }

  return (
    <div
      ref={containerRef}
      className="list-col"
    >
      <div
        className={classes.join(" ")}
        onClick={toggle ? undefined : handleClick }
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

              onChange={handleUpdate}
              onKeyPress={submitList}
              onPaste={handlePaste}
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
