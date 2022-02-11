import { KeyboardEvent, useRef, useState } from "react";
import TextareaAutosize from "react-autosize-textarea";
import { useDispatch } from "react-redux";
import "../styles/Checklist.css";

const MAX_CHECKLIST_ITEM_LENGTH = 512;

function ChecklistItem({checklistId, index, item}: any) {
  const dispatch = useDispatch();

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { status, description } = item;
  const [visible, setVisible] = useState(false);
  const [desc_, setDesc_] = useState(description);

  const saveDesc = () => {
    let description = desc_;
    if (description.trim() !== "") {
      dispatch({ type: "UpdateChecklistItem", checklistId, index, patch: { description } });
    }
    setDesc_(description);
    setVisible(false);
  };

  const toggleStatus = () => {
    dispatch({ type: "UpdateChecklistItem", checklistId, index, patch: { status: !status } });
  };

  const deleteItem = () => {
    console.log("delete");
    dispatch({ type: "DeleteChecklistItem", checklistId, index });
  };

  const onBlur = () => {
    saveDesc();
  };

  const onFocus = () => {
    setVisible(true);
  };

  const onChange = (event: any) => {
    const title = event.target.value;
    setDesc_(title);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && desc_.trim() !== "") {
      event.preventDefault();
      saveDesc();
    }
    if (event.key === "Escape") {
      setDesc_(description);
      inputRef.current?.blur();
    }
  };

  return (
    <div className="item">
      <div className="item-row">
        <div className="check">
          <input
            type="checkbox"
            onClick={toggleStatus}
            defaultChecked={status}
          />
        </div>
        <div className="item-desc">
          <TextareaAutosize
            ref={inputRef}
            className={"default font-85 font-600 " + (status ? "checked" : "")}
            maxLength={MAX_CHECKLIST_ITEM_LENGTH}
            placeholder="Item"
            value={desc_}
            onChange={onChange}
            onFocus={onFocus}
            onKeyDown={onKeyDown}
            spellCheck={false}
            style={{
              border: (visible ? "1px solid black" : "1px solid white"),
            }}
          />
        </div>
      </div>
      {visible && (
        <div className="menu">
          <button
            className="default right"
            onClick={deleteItem}
           >Delete Item</button>
        </div>
        )}
    </div>
  );
}

export default ChecklistItem;
