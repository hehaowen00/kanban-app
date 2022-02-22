import { ChangeEvent, useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";

import Checklists from "./CardPanel/Checklists";
import Comments from "./CardPanel/Comments";
import DescriptionView from "./CardPanel/Description";
import Outside from "./Outside";
import TitleView from "./CardPanel/Title";

import { DeleteCard, MoveChecklist, UpdateCard } from "../redux/Creators";

import "./styles/CardPanel.css";

function CardPanel() {
  const dispatch = useDispatch();

  const { cardId, listId, visible } = useSelector((state: any) =>
    Object.assign({}, state.panel)
  );

  const { title, description, checklists, comments } = useSelector((state: any) => {
    return state.board.cards[cardId];
  });

  const deleteCard = () => {
    dispatch({ type: "CloseCardView" });
    dispatch(DeleteCard(cardId, listId));
  };

  const updateCard = (patch: any) => {
    dispatch(UpdateCard(cardId, patch));
  };

  const [state, setState] = useState({
    title,
    description,
    checklists,
    startDate: "",
    endDate: "",
  });

  const [addChecklist, setAddChecklist] = useState(false);

  const setTitle = (value: string) => {
    setState({ ...state, title: value });
  };

  const setDescription = (value: string) => {
    setState({ ...state, description: value });
  };

  const updateState = (event: ChangeEvent<any>) => {
    let { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const [selected, setSelected] = useState("");

  const close = () => {
    dispatch({ type: "CloseCardView" });
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

  return (
    <div className="card-view-cover">
      <Outside
        className="list card-view bg-white flex flex-1 flex-col font-90 shadow text-left"
        update={close}
        style={{ display: visible ? "block" : "none" }}
      >
        <TitleView
          title={title}
          value={state.title}
          setValue={setTitle}
          updateCard={updateCard}
          deleteCard={deleteCard}
        />
        <DescriptionView
          description={description}
          value={state.description}
          setValue={setDescription}
          updateCard={updateCard}
        />
        <div className="menu-bar spaced-right text-left">
          <button
            className="default shadow-5"
            onClick={() => setAddChecklist(true)}
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
        <div className="br-default br-3 spaced pad-5 shadow-5">
          <div className="inline">
            <span className="font-85 font-600 noselect">
              {"Start Date "} 
            </span>
            <input
              name="startDate"
              className="default" 
              type="date"
              value={state.startDate}

              onChange={updateState}
            />
          </div>
          <div className="inline f-right">
            <span className="font-85 font-600 noselect">
              {"End Date "}
            </span> 
            <input
              name="endDate"
              className="default"
              type="datetime-local"
              value={state.endDate}

              onChange={updateState}
            />
          </div>
        </div>
        <Checklists
          cardId={cardId}
          checklists={checklists}
          active={addChecklist}
          set={setAddChecklist}
        />
        <Comments cardId={cardId} comments={comments} />
      </Outside>
    </div>
  );
}

export default CardPanel;
