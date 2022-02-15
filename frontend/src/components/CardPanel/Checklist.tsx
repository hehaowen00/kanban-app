import { ChangeEvent, Fragment, KeyboardEvent, useEffect, useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";

import ChecklistItem from "../Checklist/ChecklistItem";
import TextareaAutosize from "react-autosize-textarea";
import "../styles/Checklist.css";

import {
  MAX_CHECKLIST_TITLE_LENGTH,
  MAX_CHECKLIST_ITEM_LENGTH,
} from "../../types/Limits";
import { NewChecklistItem, DeleteChecklist } from "../../redux/Creators";

function Checklist({ cardId, id, index, isActive, setActiveList } : any) {
  const dispatch = useDispatch();
  const titleRef = useRef<HTMLTextAreaElement>(null);

  const { title, items } = useSelector((state: any) => {
    return state.board.checklists[id];
  });

  const [state, setState] = useState({
    titleInput: title,
    itemInput: "",
  });

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
    setActiveList(-1);
  };

  const titleCancel = () => {
    setEditing(false);
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

  const itemRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isActive) {
      itemRef.current?.focus();
    }
  }, [isActive]);

  const addListItem = () => {
    let newItem = state.itemInput.trim();
    if (newItem !== "") {
      let action = NewChecklistItem(id, newItem);
      dispatch(action);
      setState({ ...state, itemInput: "", });
      setActiveList(-1);
    }
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
        className="component checklist"
        ref={provided.innerRef}
        {...provided.draggableProps}
      >
        <div className="header">
        {!isEditing && (
          <Fragment>
            <div
              className="first handle font-90 font-600 margin-0"
              onClick={titleClick}
              {...provided.dragHandleProps}
            >
            {state.titleInput}
            </div>
            <div className="right-sec">
                <button
                  className="default"
                  onClick={deleteChecklist}
                >
                  Delete 
                </button>
            </div>
          </Fragment>
        )}
        {isEditing && (
          <Fragment>
            <TextareaAutosize
              ref={titleRef}
              name="titleInput"
              className="first default font-90 font-600 margin-0"
              maxLength={MAX_CHECKLIST_TITLE_LENGTH}
              placeholder="Checklist"
              value={state.titleInput}
              spellCheck={false}

              onBlur={titleBlur}
              onChange={updateState}
              onFocus={titleClick}
              onKeyPress={titleKeyPress}
            />
            <div className="right-sec">
              <button
                className="default"
                onClick={saveTitle}
              >
                Save
              </button>
              <button
                className="default"
                onClick={titleCancel}
              >
                Cancel
              </button>
            </div>
          </Fragment>
        )}
      </div>
      <div className="checklist-items">
        {items.map((item: any, index: number) => (
          <ChecklistItem key={index} index={index} checklistId={id} item={item} />
        ))}
        {isActive && (
          <div className="item new-item">

            <div className="item-row">
              <div className="item-desc item-desc-add">
                <TextareaAutosize
                  ref={itemRef}
                  name="itemInput"
                  className="default font-85"
                  maxLength={MAX_CHECKLIST_ITEM_LENGTH}
                  placeholder="New Item"
                  value={state.itemInput}
                  rows={isActive ? 3: undefined}

                  onChange={updateState}
                  onKeyPress={itemKeyPress}
                />
              </div>
            </div>
            <div className="menu new-item-menu text-right">
              <button
                className="default"
                onClick={addListItem}
              >
                Add Item
              </button>
              <button
                className="default"
                onClick={() => setActiveList(-1)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        {!isActive &&<div className="item new-item no-border">
          <div className="item-row">
            <div className="item-desc item-desc-menu no-margin-left">
              <button
                className="default"
                onClick={() => setActiveList(index)}
              >
                Add Item
              </button>
            </div>
          </div>
        </div>}
      </div>
    </div>
    )}
    </Draggable>
  );
}

export default Checklist;
