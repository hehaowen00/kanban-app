import React, {
  ReactElement,
  ChangeEvent,
  ClipboardEvent,
  Fragment,
  useEffect,
  useRef,
  useState,
} from "react";
import CustomTextArea from "./custom/CustomTextArea";
import { connect } from "react-redux";
import { AddList } from "../redux/actions/List";

import "./styles/AddList.css";

function KanbanAddList({ addList }: Props): ReactElement {
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
      addList(content);
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
  addList: any
};

const Styles: any = {
  textarea: {
    border: '1px solid black',
    padding: "4px 4px 4px 8px",
  }
}

const mapStateToProps = null;

const mapDispatchToProps = (dispatch: any) => {
  return {
    addList: (name: string) => dispatch(AddList(name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(KanbanAddList);
