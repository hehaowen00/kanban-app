import { ChangeEvent, useEffect, useState, useRef, } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddChecklist from "./Checklist/AddChecklist";
import Checklists from "./Checklist/Checklists";
import Comments from "./Comments";
import Description from "./Description";
import Labels from "./Labels";
import Title from "./Title";

import { deleteCard, updateCard } from "../../redux/Reducers/Board";
import { closeCardView, showLabelModal } from "../../redux/Reducers/UI";
import { AppState } from "../../redux/Store";
import * as Types from "../../types/Kanban";

import "../../styles/CardPanel.css";

function CardPanel() {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.scrollIntoView({ behavior: 'auto' });
  });

  const { cardId, listId } = useSelector(({ ui }: AppState) => {
    return ui;
  });

  const card = useSelector(({ board }: AppState) => {
    return board.cards[cardId];
  });

  const { startDate, endDate, labels, comments } = card;
  const [dates, setDates] = useState({ startDate, endDate });
  const [addChecklist, setAddChecklist] = useState(false);

  const close = () => {
    dispatch(closeCardView());
  };

  const removeCard = () => {
    dispatch(closeCardView());
    dispatch(deleteCard({ listId, cardId, }));
  };

  const putCard = (card: Partial<Types.Card>) => {
    dispatch(updateCard({ id: cardId, card }));
  };

  const addLabel = () => {
    dispatch(showLabelModal());
  };

  const updateDate = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDates({ ...dates, [name]: value });
    putCard({ [name]: value });
  };

  return (
    <>
      <div className="card-view-cover" onClick={close}></div>
      <div ref={containerRef} className="padded z-2 pb-[20px] card-panel-container">
        <div
          className="list card-view br-3 bg-grey block font-85 shadow text-left"
        >
          <Title
            title={card.title}
            updateCard={putCard}
            deleteCard={removeCard}
          />
          <Description
            description={card.description}
            updateCard={putCard}
          />
          <div className="menu-bar px-1.5 spaced-right text-left text-center flex flex-row">
            <button
              className="flex-1 bg-slate-200 text-slate-700 px-3 py-1 rounded
              hover:bg-slate-700 hover:text-white"
              onClick={() => setAddChecklist(true)}
            >
              Add Checklist
            </button>
            <button
              className="flex-1 bg-slate-200 text-slate-700 px-3 py-1 rounded
               hover:bg-slate-700 hover:text-white"
              onClick={addLabel}
            >
              Add Label
            </button>
          </div>
          <Labels cardId={cardId} assigned={labels} />
          <div
            className="bg-grey-100 px-1.5 mt-1 mb-1 br-3 border-none flex flex-row items-center"
          >
            <div className="w-1/2 flex mr-0.5">
              <div className="date items-center font-85 flex no-select">
                Start Date
              </div>
              <input
                name="startDate"
                className="default ml-auto px-2 py-1 border-none rounded focus:drop-shadow"
                type="date"
                value={dates.startDate}
                onChange={updateDate}
              />
            </div>
            <div className="ml-0.5 w-1/2 flex">
              <div
                className="ml-1 date items-center float-left font-85 flex no-select"
              >
                Due Date
              </div>
              <input
                name="endDate"
                className="default ml-auto px-2 py-1 border-none rounded focus:drop-shadow"
                type="date"
                value={dates.endDate}
                onChange={updateDate}
              />
            </div>
          </div>
          <Checklists cardId={cardId} checklists={card.checklists} />
          {addChecklist &&
            <AddChecklist
              active={addChecklist}
              cardId={cardId}
              close={() => setAddChecklist(false)}
            />
          }
          <Comments cardId={cardId} comments={comments} />
        </div>
      </div>
    </>
  );
}

export default CardPanel;
