import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import TextareaAutosize from "react-autosize-textarea";

import { useDispatch } from "react-redux";

import { DeleteChecklistItem, UpdateChecklistItem } from "../../redux/Creators";
import { ChecklistItem } from "../../types/Kanban";
import { MAX_CHECKLIST_ITEM_LENGTH } from "../../types/Limits";

import "../styles/Checklist.css";

function ChecklistItemView({ checklistId, index, item }: Props) {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { status, description } = item;
  const [state, setState] = useState({
    desc: description,
    visible: false,
  });

  useEffect(() => {
    if (state.visible) {
      inputRef.current?.focus();
    }
  }, [state.visible]);

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

  const onBlur = () => {
    setState({ ...state, visible: false });
  };

  const onClick = () => {
    setState({ ...state, visible: true });
  };

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setState({ ...state, desc: value, });
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

  let classes = ["block", "bg-white", "default", "font-85"];

  if (status && !state.visible) {
    classes.push("checked");
  }

  let key = `${checklistId}-${index}`;

  return (
    <Draggable draggableId={key} index={index}>
      {(provided) => (
        <div
          key={key}
          ref={provided.innerRef}
          className="item bg-white flex flex-col mb-0"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="item-row bg-white flex flex-row">
            <div className="check">
              <input
                type="checkbox"
                onChange={toggleStatus}
                checked={status}
              />
            </div>
            {state.visible && (
            <div className="item-desc block">
              <TextareaAutosize
                ref={inputRef}
                name="desc"
                className="default font-85"
                maxLength={MAX_CHECKLIST_ITEM_LENGTH}
                placeholder="Item"
                spellCheck={state.visible}
                value={state.desc}

                onBlur={onBlur}
                onChange={onChange}
                onKeyDown={onKeyDown}
                onKeyPress={onKeyPress}
              />
            </div>
            )}
            {!state.visible && (
              <div
                className={classes.join(" ")}
                onClick={onClick}
              >
                {description}
              </div>
            )}
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
      )}
    </Draggable>
  );
}

type Props = {
  checklistId: string,
  index: number,
  item: ChecklistItem,
};

export default ChecklistItemView;
