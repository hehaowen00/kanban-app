import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";

import ChecklistItemView from "../Checklist/ChecklistItem";
import TextareaAutosize from "react-autosize-textarea";

import { NewChecklistItem, DeleteChecklist } from "../../redux/Creators";
import { AppState } from "../../redux/Store";
import { ChecklistItem } from "../../types/Kanban";
import {
  MAX_CHECKLIST_TITLE_LENGTH,
  MAX_CHECKLIST_ITEM_LENGTH,
} from "../../types/Limits";

import { lockYAxis } from "../styles/util";
import "../styles/Checklist.css";

function ChecklistView({ cardId, id, index }: Props) {
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
      dispatch({ type: "UpdateChecklist", checklistId: id, delta: { title: value } });
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
      {(provided: any, snapshot: any) => (
        <div
          key={id}
          className={`checklist mt-2 bg-grey br-3 ${snapshot.isDragging && 'opacity-90'}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={{ ...lockYAxis(provided.draggableProps.style) }}
        >
          <div className="header">
            {!isEditing && (
              <div
                className="checklist-title rounded handle font-85 font-600 m-0"
                onClick={titleClick}
                {...provided.dragHandleProps}
              >
                {state.titleInput}
              </div>
            )}
            {isEditing && (
              <>
                <TextareaAutosize
                  ref={titleRef}
                  name="titleInput"
                  className="checklist-title rounded default flex flex-col font-85 font-500 m-0 focus:drop-shadow"
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
                    className="text-slate-700 px-3 py-1 rounded hover:bg-slate-700 hover:text-white"
                    onMouseDown={deleteChecklist}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
          <Droppable droppableId={id} type="droppableItems">
            {(provided) => (
              <div className="block mt-5 relative" ref={provided.innerRef}>
                {items.map((item: ChecklistItem, index: number) => (
                  <ChecklistItemView key={index} index={index} checklistId={id} item={item} />
                ))}
                {provided.placeholder}
                {state.active && (
                  <div className="mb-0 mt-5">
                    <TextareaAutosize
                      ref={itemRef}
                      name="itemInput"
                      className="default font-85 font-500 focus:drop-shadow"
                      maxLength={MAX_CHECKLIST_ITEM_LENGTH}
                      placeholder="New Item"
                      value={state.itemInput}
                      rows={state.active ? 3 : undefined}

                      onBlur={cancelAddItem}
                      onChange={updateState}
                      onKeyPress={itemKeyPress}
                    />
                    <div className="menu mt-5 spaced-right text-right">
                      <button
                        className="bg-sky-600 text-white px-3 py-1 rounded hover:bg-sky-700"
                        onMouseDown={addListItem}
                      >
                        Save
                      </button>
                      <button
                        className="text-slate-700 px-3 py-1 bg-slate-300 rounded hover:bg-slate-700 hover:text-white"
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
                      className="text-slate-700 px-3 py-1 bg-slate-200 rounded hover:bg-slate-700 hover:text-white"
                      onMouseDown={() => setActive(true)}
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

type Props = {
  cardId: string,
  id: string,
  index: number,
};

export default ChecklistView;
