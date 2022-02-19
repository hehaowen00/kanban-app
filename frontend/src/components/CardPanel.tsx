import { ChangeEvent, Fragment, KeyboardEvent, useRef, useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";

import TextareaAutosize from "react-autosize-textarea";
import AddChecklist from "./Checklist/AddChecklist";
import Comments from "./CardPanel/Comments";

import Checklist from "./CardPanel/Checklist";

import { MAX_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH } from "../types/Limits";
import { DeleteCard, MoveChecklist, UpdateCard } from "../redux/Creators";

import "./styles/CardPanel.css";
import Outside from "./Outside";

function CardPanel() {
  const dispatch = useDispatch();

  const { cardId, listId, visible } = useSelector((state: any) =>
    Object.assign({}, state.panel)
  );

  const { title, description, checklists, comments } = useSelector((state: any) => {
    return state.board.cards[cardId];
  });

  const [state, setState] = useState({
    title,
    description,
    focused: false,
    descFocused: false,
    selected: "",
  });

  const updateState = (event: ChangeEvent<HTMLTextAreaElement>) => {
    let { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const [selected, setSelected] = useState("");
  const closeSelected = () => {
    setSelected("");
  };

  const titleRef = useRef<HTMLTextAreaElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const close = () => {
    dispatch({ type: "CloseCardView" });
  };

  const titleUpdate = () => {
    let title_ = state.title.trim();

    if (title_ !== "") {
      let action = UpdateCard(cardId, { title: title_.trim() });
      dispatch(action);
    }
  };

  const titleBlur = () => {
    titleUpdate();
    titleRef.current?.blur();
    setState({ ...state, focused: false });
  };

  const titleFocus = () => {
    setActiveList(-1);
    setState({ ...state, focused: true });
  }

  const deleteCard = () => {
    dispatch(DeleteCard(cardId, listId));
    close();
  };

  const titleCancel = () => {
    titleRef.current?.blur();
    setState({ ...state, title, focused: false });
  };

  const titleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      titleUpdate();
    } 

    if (event.key === "Escape") {
      titleCancel();
    }
  };

  const updateDescription = () => {
    let action = UpdateCard(cardId, { description: state.description });
    dispatch(action);
  };

  const descBlur = () => {
    if (state.description !== description) {
      updateDescription();
    }
    setState({ ...state, descFocused: false });
  };

  const descFocus = () => {
    setActiveList(-1);
    setState({ ...state, descFocused: true });
  };

  const descKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      updateDescription();
      descriptionRef.current?.blur();
    }
  };

  const handleDragEnd = (event: DropResult) => {
    const { source, destination } = event;

    if (!destination) {
      return;
    }

    const srcIdx = source.index;
    const destIdx = destination.index;

    if (srcIdx === destIdx) {
      return;
    }

     let action = MoveChecklist(cardId, srcIdx, destIdx);
     dispatch(action);
  };

  const [activeList, setActiveList] = useState(-1);

  return (
    <div className="card-view-cover">
      <Outside
        className="list card-view bg-white flex flex-1 flex-col font-90 text-left"
        update={close}
        style={{ display: visible ? "block" : "none" }}
      >
        <div className="block">
          <TextareaAutosize
            name="title"
            ref={titleRef}
            className="default font-90 font-600 shadow"
            maxLength={MAX_TITLE_LENGTH}
            onChange={updateState}
            onBlur={titleBlur}
            onFocus={titleFocus}
            onKeyDown={titleKeyPress}
            placeholder="Title"
            spellCheck={false}
            value={state.title}
          />
          {state.focused && (
            <div className="menu mt-5 spaced-right text-right">
              <button
                className="shadow default"
                onClick={titleUpdate}
              >
                Save
              </button>
              <button
                className="shadow default"
                onClick={titleCancel}
              >
                Cancel
              </button>
            </div>
          )}
          {!state.focused && (
            <div className="menu mt-5 text-right">
              <button
                className="default shadow"
                onClick={deleteCard}
              >
                Delete Card
              </button>
            </div>
          )}
        </div>
        <TextareaAutosize
          name="description"
          ref={descriptionRef}
          className="description shadow default font-85"
          maxLength={MAX_DESCRIPTION_LENGTH}
          onBlur={descBlur}
          onChange={updateState}
          onFocus={descFocus}
          onKeyPress={descKeyPress}
          placeholder="Description"
          rows={state.description === "" || state.descFocused ? 5 : 3}
          spellCheck={false}
          value={state.description}
        />
        <div className="menu-bar spaced-right text-left">
            <button
              className="default shadow-5"
              onClick={() => setSelected("checklist")}
            >
              Add Checklist
            </button>
            <button className="default shadow-5">
              Add Label
            </button>
            <button className="default shadow-5">
              Set Start Date
            </button>
            <button className="default shadow-5">
              Set End Date
            </button>
        </div>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable
          droppableId="checklists"
          type="droppableChecklists"
          direction="vertical"
          >
          {(provided: any) => (
            <div
              className="checklists"
              ref={provided.innerRef}
            >
            {checklists.map((id: string, index: number) => (
              <Checklist 
                key={id}
                index={index}
                cardId={cardId}
                id={id}
                isActive={activeList === index}
                setActiveList={setActiveList}
              />
            ))}
            {provided.placeholder}
            {selected === "checklist" && (
              <AddChecklist cardId={cardId} close={closeSelected} />
            )}
          </div>
          )}
          </Droppable>
        </DragDropContext>
        <Comments cardId={cardId} comments={comments} />
      </Outside>
    </div>
  );
}

export default CardPanel;
