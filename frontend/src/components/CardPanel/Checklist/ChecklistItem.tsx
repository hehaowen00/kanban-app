import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import TextareaAutosize from "react-autosize-textarea";

import { useDispatch } from "react-redux";

import { ChecklistItem } from "../../../types/Kanban";
import { MAX_CHECKLIST_ITEM_LENGTH } from "../../../types/Limits";

import { lockYAxis } from "../../../utils/Dnd";
import "../../../styles/Checklist.css";
import { deleteChecklistItem, updateChecklistItem } from "../../../redux/Reducers/Board";

function ChecklistItemView({ allowed, checklistId, index, item }: Props) {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { status, description } = item;
  const [state, setState] = useState({
    desc: '',
    visible: false,
  });

  useEffect(() => {
    if (state.visible) {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(state.desc.length, state.desc.length);
    }
  }, [state.visible]);

  const deleteItem = () => {
      /* let action = DeleteChecklistItem(checklistId, index);
  * dispatch(action); */
    dispatch(deleteChecklistItem({ checklistId, index }));
  };

  const toggleStatus = () => {
      /* let action = UpdateChecklistItem(checklistId, index, { status: !status });
  * dispatch(action); */
    dispatch(updateChecklistItem({ checklistId, index, item: { status: !status } }));
  };

  const updateDescription = () => {
    let description = state.desc.trim();
    if (description.length !== 0) {
        /* let action = UpdateChecklistItem(checklistId, index, { description });
  * dispatch(action); */
      dispatch(updateChecklistItem({ checklistId, index, item: { description } }));
    }
  };

  const onBlur = () => {
    setState({ ...state, visible: false });
  };

  const onClick = () => {
    setState({ ...state, desc: description, visible: true });
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

  // let classes = ["block", "rounded", "bg-white", "default", "font-85"];

  // if (status && !state.visible) {
  //   classes.push("checked");
  // }

  let isDragging = (check: boolean) => check ? "bg-gray-100 drop-shadow" : "";

  let checked = (status && !state.visible) ? "checked" : "";
  let key = `${checklistId}-${index}`;

  return (
    <Draggable
      isDragDisabled={allowed || state.visible}
      key={key}
      draggableId={key}
      index={index}
    >
      {(provided, snapshot) => (
        <div
          key={key}
          ref={provided.innerRef}
          className={`item br-3 flex flex-col mb-0 ${isDragging(snapshot.isDragging)}`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={lockYAxis(provided.draggableProps.style || {})}
        >
          <div className="item-row br-3 flex flex-row">
            <div className="check">
              <input
                type="checkbox"
                className="accent-blue-700"
                onChange={toggleStatus}
                checked={status}
              />
            </div>
            {state.visible && (
              <div className="item-desc rounded block">
                <TextareaAutosize
                  ref={inputRef}
                  name="desc"
                  className="default font-85 focus:drop-shadow"
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
                className={`block rounded bg-white default font-85 ${checked}`}
                onClick={onClick}
              >
                {description}
              </div>
            )}
          </div>
          {state.visible && (
            <div className="menu text-right">
              <button
                className="text-slate-700 px-3 py-1 bg-slate-300 rounded
                 hover:bg-slate-700 hover:text-white"
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
  allowed: boolean,
};

export default ChecklistItemView;
