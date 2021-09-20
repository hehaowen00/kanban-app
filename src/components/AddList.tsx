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

import "./styles/AddList.css";

function KanbanAddList({ }: Props): ReactElement {
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
              <span className="link">{"Add List"}</span>
              <span className="link" style={{ marginLeft: "5px" }}>{"Cancel"}</span>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
}

type Props = {};

const Styles: any = {
  textarea: {
    border: '1px solid black'
  }
}

export default KanbanAddList;
