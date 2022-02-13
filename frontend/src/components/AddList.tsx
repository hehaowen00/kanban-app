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
import { connect, useDispatch, useSelector } from "react-redux";

import "./styles/AddList.css";

function KanbanAddList({ addNewList }: Props): ReactElement {
  const [toggle, setToggle] = useState(false);
  const [content, setContent] = useState("");

  let inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  });

  const handleClick = () => {
    setToggle(!toggle);
  };

  const handlePaste = (event: ClipboardEvent) => {
    const append = event.clipboardData.getData("text");
    setContent(content + append);
  };

  const handleUpdate = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const createList = () => {
    if (content !== "") {
      addNewList(content);
      setContent("");
      setToggle(false);
    }
  }

  const cancelNewList = () => {
    setContent("");
    setToggle(false);
  }

  const submitList = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      createList();
    }
  };

  let classes = ["list", "add-list"];

  if (toggle) {
    classes.push("active");
  }

  let v = classes.join(" ");

  return (
    <div className="list-col">
      <div className={v} onClick={toggle ? undefined : handleClick }>
        {!toggle && (
          <div className="list-header flat noselect" >
              {"Add List"}
          </div>
        )}
        {toggle && (
          <Fragment>
            <TextareaAutosize
              ref={inputRef}
              className="list-header textarea-card border-sized noselect"
              maxLength={255}
              placeholder="Title"

              onChange={handleUpdate}
              onKeyPress={submitList}
              onPaste={handlePaste}
            />
            <div className="btn noselect">
              <button className="default" onClick={createList}>Add List</button>
              <button className="default" onClick={cancelNewList}>Cancel</button>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
}

type Props = {
  addNewList: any
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addNewList: (name: string) => dispatch({ type: "NewList", name }), 
  };
}

export default connect(null, mapDispatchToProps)(KanbanAddList);
