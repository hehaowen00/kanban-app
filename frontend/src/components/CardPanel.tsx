import { Fragment, KeyboardEvent, useRef, useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";

import TextareaAutosize from "react-autosize-textarea";
import AddChecklist from "./CardPanel/AddChecklist";
import Comments from "./CardPanel/Comments";

import Checklist from "./CardPanel/Checklist";

import "./styles/CardView.css";
import "./styles/Elements.css";

const MAX_TITLE_LENGTH = 512;
const MAX_DESCRIPTION_LENGTH = 1048;

function CardPanel() {
  const dispatch = useDispatch();

  const cardView = useSelector((state: any) => Object.assign({}, state.panel));
  const { cardId, visible } = cardView;

  const { title, description, attachments, checklists, comments } = useSelector((state: any) => {
    return state.board.cards[cardId];
  });

  const [title_, setTitle_] = useState(title);
  const [desc_, setDesc_] = useState(description);
  const [titleFocused, setTitleFocused] = useState(false);

  const [selected, setSelected] = useState("");
  const closeSelected = () => {
    setSelected("");
  };

  const titleRef = useRef<HTMLTextAreaElement>(null);

  const titleBlur = () => {
    setTitle_(title);
    setTitleFocused(false);
  };

  const titleChange = (event: any) => {
    let cleaned = event.target.value;
    setTitle_(cleaned);
  };

  const titleFocus = () => {
    setActiveList(-1);
    setTitleFocused(true);
  }

  const titleSave = () => {
      if (title_.trim() !== "" && title_ !== title) {
        dispatch({ type: "UpdateCard", cardId, patch: { title: title_.trim() } });
      }
      titleRef.current?.blur();
      setTitleFocused(false);
  };
  
  const titleCancel = () => {
      setTitle_(title);
      titleRef.current?.blur();
      setTitleFocused(false);
  };

  const titleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      titleSave();
    } 
    if (event.key === "Escape") {
      titleCancel();
    }
  };

  const descBlur = () => {
    if (desc_.trim() === "") {
      setDesc_(description);
    } else if (desc_ !== description) {
      dispatch({ type: "UpdateCard", cardId, patch: { title: title_ } });
    }
  };

  const descChange = (event: any) => {
    const { value } = event.target;
    if (value === "" || value.trim() !== "") {
      setDesc_(value);
    }
  };

  const descFocus = () => {
    setActiveList(-1);
  };

  const descKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
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

     dispatch({ type: "MoveChecklist", cardId, srcIdx, destIdx })
  };

  const close = () => {
    dispatch({ type: "CloseCardView" });
  };

  const [activeList, setActiveList] = useState(-1);

  return (
    <Fragment>
    <div className="card-view-cover" onClick={close}>
    </div>
    <div
      className="list card-view"
      style={{ display: visible ? "block" : "none" }}
    >
      <div className="title">
        <TextareaAutosize
          ref={titleRef}
          className="default font-90 font-600"
          maxLength={MAX_TITLE_LENGTH}
          onChange={titleChange}
          onBlur={titleBlur}
          onFocus={titleFocus}
          onKeyDown={titleKeyPress}
          placeholder="Title"
          spellCheck={false}
          value={title_}
        />
        {titleFocused && (
        <div className="test">
          <button
            className="default"
            onClick={titleSave}
          >
            Save
          </button>
          <button
            className="default"
          >
            Cancel
          </button>
        </div>
        )}
      </div>
      <TextareaAutosize
        className="default font-85"
        maxLength={MAX_DESCRIPTION_LENGTH}
        onBlur={descBlur}
        onChange={descChange}
        onFocus={descFocus}
        onKeyPress={descKeyPress}
        placeholder="Description"
        rows={4}
        spellCheck={false}
        value={desc_}
      />
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
          {selected !== "checklist" && (
            <div
              className="component div-btn pad-reduced text-center font-85 font-600"
              onClick={() => setSelected("checklist")}
            >
              Add Checklist
            </div>
          )}
        </div>
        )}
        </Droppable>
      </DragDropContext>
      <Comments cardId={cardId} comments={comments} />
    </div>
    </Fragment>
  );
}

export default CardPanel;
