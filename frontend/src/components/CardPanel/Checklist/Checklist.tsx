import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { useDispatch, useSelector } from "react-redux";

import ChecklistItem from "./ChecklistItem";
import TextareaAutosize from "react-autosize-textarea";

import { deleteChecklist, newChecklistItem } from "../../../redux/Reducers/Board";
import { AppState } from "../../../redux/Store";
import * as Types from "../../../types/Kanban";
import {
  MAX_CHECKLIST_ITEM_LENGTH,
  MAX_CHECKLIST_TITLE_LENGTH,
} from "../../../types/Limits";

import { lockYAxis } from "../../../utils/Dnd";
import "../../../styles/Checklist.css";

function Checklist({ cardId, dragging, id, index }: Props) {
  const dispatch = useDispatch();
  const titleRef = useRef<HTMLTextAreaElement>(null);

  const { title, items } = useSelector(({ board }: AppState) => {
    return { ...board.checklists[id] };
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
        let length: number = titleRef.current.value.length;
        titleRef.current.selectionStart = length;
        titleRef.current.selectionEnd = length;
      }
    }
    if (dragging) {
      setEditing(false);
    }
  }, [isEditing, dragging]);

  const titleBlur = () => {
    setEditing(false);
    // TODO: discard new changes when cancelled or blurred
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

  const titleKeyUp = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Escape") {
      // TODO: implement
    }
  };

  const saveTitle = () => {
    let value = state.titleInput.trim();
    if (value.length !== 0) {
      dispatch({ type: "UpdateChecklist", checklistId: id, delta: { title: value } });
      setState({ ...state, titleInput: value.trim() });
    } else {
      setState({ ...state, titleInput: title });
    }
    setEditing(true);
  };

  const removeChecklist = () => {
    dispatch(deleteChecklist({ cardId, checklistId: id }));
  };

  const itemRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (state.active) {
      itemRef.current?.focus();
      itemRef.current?.scrollIntoView();
    }
  }, [state.active]);

  const addListItem = () => {
    let item = state.itemInput.trim();
    if (item !== "") {
      dispatch(newChecklistItem({ checklistId: id, description: item }));
      setState({ ...state, itemInput: "", });
    }
  };

  const cancelAddItem = () => {
    setState({ ...state, active: false, itemInput: "" });
  };

  const onKeyUp = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Escape") {
      cancelAddItem();
    }
  };

  const onKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addListItem();
    }
  };

  return (
    <Draggable
      key={id}
      draggableId={id}
      index={index}
      isDragDisabled={isEditing}
    >
      {(provided: any, snapshot: any) => (
        <div
          key={id}
          className={`checklist px-1.5 pb-1.5 bg-grey br-3 ${snapshot.isDragging && 'opacity-90'}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{ ...lockYAxis(provided.draggableProps.style) }}
        >
          <div className="header">
            {(dragging || !isEditing) && (
              <div className="flex flex-row">
                <div className="mt-1 w-[10px] spacer font-500">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                  </svg>
                </div>
                <div
                  className="checklist-title rounded handle text-sm font-500 m-0 flex flex-1"
                  onClick={titleClick}
                >
                  {state.titleInput}
                </div>
              </div>
            )}
            {isEditing && (
              <>
                <TextareaAutosize
                  ref={titleRef}
                  name="titleInput"
                  className="checklist-title default flex flex-col text-sm font-500 m-0 focus:drop-shadow"
                  maxLength={MAX_CHECKLIST_TITLE_LENGTH}
                  placeholder="Checklist"
                  value={state.titleInput}
                  spellCheck={false}

                  onBlur={titleBlur}
                  onChange={updateState}
                  onFocus={titleClick}
                  onKeyPress={titleKeyPress}
                  onKeyUp={titleKeyUp}
                />
                <div className="mt-1 spaced-right text-right">
                  <button
                    className="text-slate-700 px-3 py-1 bg-slate-300 rounded hover:bg-slate-700 hover:text-white"
                    onMouseDown={removeChecklist}
                  >
                    Delete Checklist
                  </button>
                </div>
              </>
            )}
          </div>
          <Droppable droppableId={id} type="droppableItems">
            {(provided) => (
              <div className="block relative" ref={provided.innerRef}>
                {items.map((item: Types.ChecklistItem, index: number) => (
                  <ChecklistItem
                    allowed={isEditing}
                    key={index}
                    index={index}
                    checklistId={id}
                    item={item}
                    dragging={dragging}
                  />
                ))}
                {provided.placeholder}
                {!dragging && state.active && (
                  <div className="mb-0 mt-1">
                    <TextareaAutosize
                      ref={itemRef}
                      name="itemInput"
                      className="default font-85 focus:drop-shadow"
                      maxLength={MAX_CHECKLIST_ITEM_LENGTH}
                      placeholder="New Item"
                      value={state.itemInput}
                      rows={state.active ? 3 : undefined}

                      onBlur={cancelAddItem}
                      onChange={updateState}
                      onKeyUp={onKeyUp}
                      onKeyPress={onKeyPress}
                    />
                    <div className="menu mt-1 spaced-right text-right">
                      <button
                        className="btn-blue"
                        onMouseDown={addListItem}
                      >
                        Save
                      </button>
                      <button
                        className="btn-gray"
                        onMouseDown={cancelAddItem}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
                {(!dragging || !state.active) && (
                  <div className="mt-1">
                    <button
                      className="w-full text-slate-700 px-3 py-1 bg-slate-200 rounded hover:bg-slate-700 hover:text-white"
                      onClick={() => setActive(true)}
                    >
                      Add Item
                    </button>
                  </div>
                )}
              </div>
            )}
          </Droppable>
        </div >
      )
      }
    </Draggable >
  );
}

interface Props {
  cardId: string,
  id: string,
  index: number,
  dragging: boolean,
}

export default Checklist;
