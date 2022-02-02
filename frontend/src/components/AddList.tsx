import React, {
  ReactElement,
  ChangeEvent,
  ClipboardEvent,
  Fragment,
  useEffect,
  useRef,
  useState,
} from "react";
import { connect } from "react-redux";
import CustomTextArea from "./custom/CustomTextArea";

import "./styles/AddList.css";

function KanbanAddList({ addNewList }: Props): ReactElement {
  const [toggle, setToggle] = useState(false);
  const [content, setContent] = useState("");

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

  let inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  });

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

  return (
    <div className="list-col">
      <div className="list add-list">
        {!toggle && (
          <div className="list-header flat noselect" onClick={handleClick}>
            {"Add List"}
          </div>
        )}
        {toggle && (
          <Fragment>
            <CustomTextArea
              ref={inputRef}
              count={255}
              className="list-header textarea-card border-sized noselect"
              onChange={handleUpdate}
              onPaste={handlePaste}
              style={Styles.textarea}
              value={content}
            />
            <div className="btn noselect">
              <button className="link" onClick={createList}>Add List</button>
              <button className="link" onClick={cancelNewList}>Cancel</button>
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

const Styles: any = {
  textarea: {
    border: '1px solid black',
    padding: "4px 4px 4px 8px",
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addNewList: (name: string) => dispatch({ type: "NewList", name }), 
  };
}

export default connect(null, mapDispatchToProps)(KanbanAddList);
