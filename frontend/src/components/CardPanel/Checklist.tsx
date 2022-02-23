import { ChangeEvent, Fragment, KeyboardEvent, useEffect, useRef, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";

import ChecklistItem from "../Checklist/ChecklistItem";
import TextareaAutosize from "react-autosize-textarea";
import "../styles/Checklist.css";

import {
  MAX_CHECKLIST_TITLE_LENGTH,
  MAX_CHECKLIST_ITEM_LENGTH,
} from "../../types/Limits";
import { NewChecklistItem, DeleteChecklist } from "../../redux/Creators";

function Checklist({ cardId, id, index } : any) {
  const dispatch = useDispatch();
  const titleRef = useRef<HTMLTextAreaElement>(null);

  const { title, items } = useSelector((state: any) => {
    return state.board.checklists[id];
  });

  const [state, setState] = useState({
    titleInput: title,
    itemInput: "",
    active: false,
  });

  const setActive = (value: boolean) => {
    setState({ ...state, active: value });
  };

  const updateState = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value, });
  };

  const [isEditing, setEditing] = useState(false);

  useEffect(() => {
    if (isEditing) {
      if (titleRef.current !== null) {
        titleRef.current.focus();
        let length: any = titleRef.current.value.length;
        titleRef.current.selectionStart = length;
        titleRef.current.selectionEnd = length;
      }
    }
  }, [isEditing]);

  const titleBlur = () => {
    setEditing(false);
  };

  const titleClick = () => {
    setEditing(true);
    setActive(false);
  };

  const titleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      titleRef.current?.blur();
      saveTitle();
      setEditing(false);
    }
  };

  const saveTitle = () => {
    let value = state.titleInput.trim();
    if (value.length !== 0) {
      dispatch({ type: "UpdateChecklist", checklistId: id, delta: { title: value }});
      setState({ ...state, titleInput: value.trim() });
    } else {
      setState({ ...state, titleInput: title });
    }
    setEditing(true);
  };

  const deleteChecklist = () => {
    let action = DeleteChecklist(cardId, id);
    dispatch(action);
  };

  const itemRef = useRef<any>(null);

  useEffect(() => {
    if (state.active) {
      itemRef.current?.focus();
      itemRef.current?.scrollIntoView();
    }
  }, [state.active]);

  const addListItem = () => {
    let newItem = state.itemInput.trim();
    if (newItem !== "") {
      let action = NewChecklistItem(id, newItem);
      dispatch(action);
      setState({ ...state, active: false, itemInput: "", });
    }
  };

  const cancelAddItem = () => {
    setState({ ...state, active: false, itemInput: "" });
  };

  const itemKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addListItem();
    }
  };

  return (
    <Draggable draggableId={id} index={index}>
    {(provided: any) => (
      <div
        key={id}
        className="checklist bg-white br-3 shadow-5"
        ref={provided.innerRef}
        {...provided.draggableProps}
      >
        <div className="header">
        {!isEditing && (
          <div
            className="checklist-title handle font-90 font-600 m-0"
            onClick={titleClick}
            {...provided.dragHandleProps}
          >
            {state.titleInput}
          </div>
        )}
        {isEditing && (
          <Fragment>
            <TextareaAutosize
              ref={titleRef}
              name="titleInput"
              className="checklist-title default flex flex-col font-90 font-600 m-0"
              maxLength={MAX_CHECKLIST_TITLE_LENGTH}
              placeholder="Checklist"
              value={state.titleInput}
              spellCheck={false}

              onBlur={titleBlur}
              onChange={updateState}
              onFocus={titleClick}
              onKeyPress={titleKeyPress}
            />
            <div className="menu mt-5 spaced-right text-right">
              <button
                className="default"
                onMouseDown={deleteChecklist}
              >
                Delete
              </button>
            </div>
          </Fragment>
        )}
      </div>
      <Droppable droppableId={id} type="droppableItems">
      {(provided) => (
      <div className="block mt-5 relative" ref={provided.innerRef}>
        {items.map((item: any, index: number) => (
          <ChecklistItem key={index} index={index} checklistId={id} item={item} />
        ))}
        {provided.placeholder}
        {state.active && (
          <div className="mb-0 mt-5">
            <TextareaAutosize
              ref={itemRef} 
              name="itemInput"
              className="default font-85 font-600"
              maxLength={MAX_CHECKLIST_ITEM_LENGTH}
              placeholder="New Item"
              value={state.itemInput}
              rows={state.active ? 3: undefined}

              onBlur={cancelAddItem}
              onChange={updateState}
              onKeyPress={itemKeyPress}
            />
            <div className="menu mt-5 spaced-right text-right">
              <button
                className="default"
                onMouseDown={addListItem}
              >
                Save
              </button>
              <button
                className="default"
                onMouseDown={cancelAddItem}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        {!state.active && (
          <div className="menu mt-5">
            <button
              className="default"
              onClick={() => setActive(true)}
            >
              Add Item
            </button>
          </div>
        )}
      </div>
      )}
      </Droppable>
    </div>
    )}
    </Draggable>
  );
}

export default Checklist;
