import { Fragment, ChangeEvent, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Checklists from "./CardPanel/Checklists";
import Comments from "./CardPanel/Comments";
import DescriptionView from "./CardPanel/Description";
import TitleView from "./CardPanel/Title";

import { DeleteCard, UpdateCard } from "../redux/Creators";
import { Card } from "../types/Kanban";
import { AppState } from "../redux/Store";

import "./styles/CardPanel.css";

function CardPanel() {
  const dispatch = useDispatch();

  const { cardId, listId } = useSelector(({ panel }: AppState) => {
    return { ...panel };
  });

  const { title, description, comments } = useSelector(({ board }: AppState) => {
    return { ...board.cards[cardId] };
  });

  const deleteCard = () => {
    dispatch({ type: "CloseCardView" });
    dispatch(DeleteCard(cardId, listId));
  };

  const updateCard = (patch: Partial<Card>) => {
    dispatch(UpdateCard(cardId, patch));
  };

  let containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.scrollIntoView();
  });

  const [state, setState] = useState({
    title,
    description,
    startDate: "",
    endDate: "",
  });

  const [active, setActive] = useState(false);

  const setTitle = (value: string) => {
    setState({ ...state, title: value });
  };

  const setDescription = (value: string) => {
    setState({ ...state, description: value });
  };

  const updateState = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    let { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const close = () => {
    dispatch({ type: "CloseCardView" });
  };

  return (
    <Fragment>
    <div className="card-view-cover" onClick={close}></div>
    <div ref={containerRef} className="padded z-2">
      <div
        className="list card-view br-3 bg-grey block font-90 shadow text-left"
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
            onClick={() => setActive(true)}
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
        <div className="br-default bg-white br-3 spaced pad-5 shadow-5">
          <div className="">
            <span className="font-85 font-600 no-select">
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
          <div className="">
            <span className="font-85 font-600 no-select">
              {"End Date "}
            </span> 
            <input
              name="endDate"
              className="default"
              type="date"
              value={state.endDate}

              onChange={updateState}
            />
            <input
              name="endTime"
              className="default"
              type="time"
            />
          </div>
        </div>
        <Checklists
          cardId={cardId}
          state={{active, setActive}}
        />
        <Comments cardId={cardId} comments={comments} />
      </div>
    </div>
    </Fragment>
  );
}

export default CardPanel;
