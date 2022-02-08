import { KeyboardEvent, useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-autosize-textarea";
import { useDispatch, useSelector } from "react-redux";
import { Draggable } from "react-beautiful-dnd";

import ChecklistItem from "../Checklist/ChecklistItem";
import "../styles/Checklist.css";

const MAX_CHECKLIST_TITLE_LENGTH = 128;
const MAX_CHECKLIST_ITEM_LENGTH = 512;

function Checklist({ cardId, id, index, isActive, setActiveList } : any) {
  const dispatch = useDispatch();

  const titleRef = useRef<HTMLTextAreaElement>(null);
  const [titleState, setTitleState] = useState("show");

  const { title, items } = useSelector((state: any) => {
    return state.board.checklists[id];
  });

  const [title_, setTitle_] = useState(title);
  const [item, setItem] = useState("");

  useEffect(() => {
    if (titleState === "editing") {
      if (titleRef.current !== null) {
        titleRef.current.focus();
        let length: any = titleRef.current.value.length;
        titleRef.current.selectionStart = length;
        titleRef.current.selectionEnd = length;
      }
    }
  }, [titleState]);

  const titleBlur = () => {
    setTitleState("show");
  };

  const titleClick = () => {
    setTitleState("editing");
    setActiveList(-1);
  };

  const titleChange = (event: any) => {
    let { value } = event.target;
    if (value === "" || value.trim().length > 0) {
      setTitle_(event.target.value);
    }
  };

  const titleCancelBtn = () => {
    setTitleState("show");
  };

  const titleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      titleRef.current?.blur();
      saveTitle();
    }
  };

  const saveTitle = () => {
    if (title_ !== "") {
      dispatch({ type: "UpdateChecklist", checklistId: id, patch: { title: title_ }});
    } else {
      setTitle_(title);
    }
    setTitleState("show");
  };

  const deleteChecklist = () => {
    dispatch({ type: "DeleteChecklist", cardId, checklistId: id });
  };

  const itemRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (isActive) {
      itemRef.current?.focus();
    }
  }, [isActive]);

  const addListItem = () => {
    if (item.trim() !== "") {
      dispatch({ type: "AddChecklistItem", checklistId: id, item: item.trim() });
      setItem("");
      setActiveList(-1);
    }
  };

  const itemUpdate = (event: any) => {
    setItem(event.target.value);
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
        {titleState === "show" && (
          <div className="header">
            <div
              className="first handle font-90 font-600 margin-0"
              onClick={titleClick}
              {...provided.dragHandleProps}
            >
            {title_}
            </div>
            <div className="right-sec">
                <button
                  className="default"
                  onClick={deleteChecklist}
                >
                  Delete
                </button>
            </div>
          </div>
        )}
        {titleState === "editing" && (
          <div className="header">
            <TextareaAutosize
              ref={titleRef}
              className="first default font-90 font-600 margin-0"
              maxLength={MAX_CHECKLIST_TITLE_LENGTH}
              placeholder="Checklist"
              value={title_}
              spellCheck={false}

              onBlur={titleBlur}
              onChange={titleChange}
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
                onClick={titleCancelBtn}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      <div className="checklist-items">
        {items.map((item: any, index: number) => (
          <ChecklistItem index={index} checklistId={id} item={item} />
        ))}
        {isActive && (
          <div className="item new-item">
            <div className="item-row">
              <div className="item-desc">
                <TextareaAutosize
                  ref={itemRef}
                  className="default font-85"
                  maxLength={MAX_CHECKLIST_ITEM_LENGTH}
                  placeholder="New Item"
                  value={item}

                  onChange={itemUpdate}
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
