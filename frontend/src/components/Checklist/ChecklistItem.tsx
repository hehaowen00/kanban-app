import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import TextareaAutosize from "react-autosize-textarea";

import { useDispatch } from "react-redux";

import { MAX_CHECKLIST_ITEM_LENGTH } from "../../types/Limits";
import { DeleteChecklistItem, UpdateChecklistItem } from "../../redux/Creators";

import "../styles/Checklist.css";

function ChecklistItem({checklistId, index, item}: any) {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { status, description } = item;
  const [state, setState] = useState({
    desc: description,
    visible: false,
  });

  const deleteItem = () => {
    let action = DeleteChecklistItem(checklistId, index);
    dispatch(action);
  };

  const toggleStatus = () => {
    let action = UpdateChecklistItem(checklistId, index, { status: !status });
    dispatch(action);
  };

  const updateDescription = () => {
    let description = state.desc.trim();
    if (description.length !== 0) {
      let action = UpdateChecklistItem(checklistId, index, { description });
      dispatch(action);
    }
  };

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setState({ ...state, desc: value, });
  };

  const onFocus = () => {
    setState({ ...state, visible: true, });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      inputRef.current?.blur();
      setState({ ...state, desc: description, visible: false, });
    }
  };

  const onKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      let desc = state.desc.trim();
      if (desc.length !== 0) {
        updateDescription();
        inputRef.current?.blur();
        setState({ ...state, visible: false, });
      }
    }
  };

  let classes = ["default", "font-85", "font-600"]

  if (status && !state.visible) {
    classes.push("checked");
  }

  const style = {
    border: (state.visible ? "1px solid black" : "1px solid white")
  };

  return (
    <div className="item br-3 flex flex-col mb-0">
      <div className="item-row flex flex-row">
        <div className="check">
          <input
            type="checkbox"
            onClick={toggleStatus}
            defaultChecked={status}
          />
        </div>
        <div className="item-desc block">
          <TextareaAutosize
            ref={inputRef}
            name="desc"
            className={classes.join(" ")}
            maxLength={MAX_CHECKLIST_ITEM_LENGTH}
            placeholder="Item"
            spellCheck={state.visible}
            style={style}
            value={state.desc}


            onBlur={() => setState({ ...state, visible: false })}
            onChange={onChange}
            onFocus={onFocus}
            onKeyDown={onKeyDown}
            onKeyPress={onKeyPress}
          />
        </div>
      </div>
      {state.visible && (
        <div className="menu mt-5 text-right">
          <button
            className="default"
            onMouseDown={deleteItem}
          >
           Delete Item
         </button>
        </div>
        )}
    </div>
  );
}

export default ChecklistItem;
