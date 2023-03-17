import { ChangeEvent, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Checklists from "./Checklist/Checklists";
import Comments from "./Comments";
import DescriptionView from "./Description";
import LabelView from "./LabelsView";
import TitleView from "./Title";

import { CloseCardView, DeleteCard, UpdateCard } from "../../redux/Creators";
import { Card } from "../../types/Kanban";
import { AppState } from "../../redux/Store";

import "../../Styles/CardPanel.css";
import AddChecklist from "./Checklist/AddChecklist";

function CardPanel() {
  const dispatch = useDispatch();

  const { cardId, listId } = useSelector(({ panel }: AppState) => {
    return { ...panel };
  });

  const { title, description, startDate, endDate, labels, comments } = useSelector(({ board }: AppState) => {
    return { ...board.cards[cardId] };
  });

  const deleteCard = () => {
    dispatch(CloseCardView());
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
    startDate,
    endDate,
  });

  const [addChecklist, setAddChecklist] = useState(false);
  // console.log(addChecklist)
  const [selectLabels, setSelectLabels] = useState(false);

  const setTitle = (value: string) => {
    setState({ ...state, title: value });
  };

  const setDescription = (value: string) => {
    setState({ ...state, description: value });
  };

  const updateState = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    let { name, value } = event.target;
    setState({ ...state, [name]: value });
    updateCard({ [name]: value })
  };

  const close = () => {
    dispatch(CloseCardView());
  };

  return (
    <>
      <div className="card-view-cover" onClick={close}></div>
      <div ref={containerRef} className="padded z-2">
        <div
          className="list card-view br-3 bg-grey block font-85 shadow text-left"
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
          <div className="menu-bar spaced-right text-left text-center">
            <button
              className="bg-slate-200 text-slate-700 px-3 py-1 rounded hover:bg-slate-700 hover:text-white"
              onClick={() => setAddChecklist(true)}
            >
              Add Checklist
            </button>
            <button
              className="bg-slate-200 text-slate-700 px-3 py-1 rounded hover:bg-slate-700 hover:text-white"
              onClick={() => setSelectLabels(true)}
            >
              Add Label
            </button>
            {/* <button
              className="text-slate-700 px-3 py-1 rounded hover:bg-slate-700 hover:text-white"
            >
              Add Date
            </button> */}
          </div>
          {(labels.length > 0 || selectLabels) && (
            <LabelView
              cardId={cardId}
              assigned={labels}
              selectLabels={selectLabels}
              close={() => setSelectLabels(false)}
            />
          )}
          <div className="bg-grey-100 br-3 border-none flex flex-row">
            <div className="mr-2">
              <span className="date mr-1 font-85 font-500 inline-block no-select">
                {"Start Date "}
              </span>
              <input
                name="startDate"
                className="default px-2 py-1 border-none focus:drop-shadow"
                type="date"
                value={state.startDate}

                onChange={updateState}
              />
            </div>
            <div className="ml-auto">
              <span className="date mr-1 py-1 font-85 font-500 inline-block no-select">
                {"Due Date "}
              </span>
              <input
                name="endDate"
                className="default px-2 py-1 border-none focus:drop-shadow"
                type="date"
                value={state.endDate}

                onChange={updateState}
              />
            </div>
          </div>
          <Checklists
            cardId={cardId}
          />
          {addChecklist &&
            <AddChecklist
              active={addChecklist}
              cardId={cardId}
              close={() => setAddChecklist(false)}
            />
          }
          <Comments
            cardId={cardId}
            comments={comments}
          />
        </div>
      </div>
    </>
  );
}

export default CardPanel;
