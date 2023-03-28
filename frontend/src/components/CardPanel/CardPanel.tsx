import {
  ChangeEvent,
  useEffect,
  useState,
  useRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";

import AddChecklist from "./Checklist/AddChecklist";
import DescriptionView from "./Description";
import Checklists from "./Checklist/Checklists";
import Comments from "./Comments";
import LabelView from "./LabelsView";
import TitleView from "./Title";

import {
  CloseCardView,
  DeleteCard,
  ShowLabelModal,
  UpdateCard,
} from "../../redux/Creators";
import { Card } from "../../Types/Kanban";
import { AppState } from "../../redux/Store";

import "../../styles/CardPanel.css";

function CardPanel() {
  const dispatch = useDispatch();
  let containerRef = useRef<HTMLDivElement>(null);

  const { cardId, listId } = useSelector(({ ui }: AppState) => {
    return ui;
  });

  const {
    startDate,
    endDate,
    labels,
    comments
  } = useSelector(({ board }: AppState) => {
    return { ...board.cards[cardId], };
  });

  const deleteCard = () => {
    dispatch(CloseCardView());
    dispatch(DeleteCard(cardId, listId));
  };

  const updateCard = (patch: Partial<Card>) => {
    dispatch(UpdateCard(cardId, patch));
  };

  useEffect(() => {
    containerRef.current?.scrollIntoView({ behavior: 'auto' });
  });

  const [state, setState] = useState({
    startDate,
    endDate,
  });

  const [addChecklist, setAddChecklist] = useState(false);
  const [selectLabels, setSelectLabels] = useState(false);

  const updateState = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    let { name, value } = event.target;
    setState({ ...state, [name]: value });
    updateCard({ [name]: value })
  };

  const addLabel = () => {
    dispatch(ShowLabelModal(cardId));
  }

  const close = () => {
    dispatch(CloseCardView());
  };

  return (
    <>
      <div className="card-view-cover" onClick={close}></div>
      <div ref={containerRef} className="padded z-2 pb-[20px] card-panel-container">
        <div
          className="list card-view br-3 bg-grey block font-85 shadow text-left"
        >
          <TitleView
            cardId={cardId}
            updateCard={updateCard}
            deleteCard={deleteCard}
          />
          <DescriptionView
            cardId={cardId}
            updateCard={updateCard}
          />
          <div className="menu-bar spaced-right text-left text-center flex flex-row">
            <button
              className="flex-1 bg-slate-200 text-slate-700 px-3 py-1 roundea
              d hover:bg-slate-700 hover:text-white"
              onClick={() => setAddChecklist(true)}
            >
              Add Checklist
            </button>
            {/* <button
              className="flex-1 bg-slate-200 text-slate-700 px-3 py-1 rounded
              d hover:bg-slate-700 hover:text-white"
            >
              Add Date
            </button> */}
            <button
              className="flex-1 bg-slate-200 text-slate-700 px-3 py-1 rounded
               hover:bg-slate-700 hover:text-white"
              onClick={addLabel}
            >
              Add Label
            </button>
            {/* <button
              className="text-slate-700 px-3 py-1 rounded hover:bg-slate-700 hover:text-white"
            >
              Add Date
            </button> */}
          </div>
          <LabelView
            cardId={cardId}
            assigned={labels}
            selectLabels={selectLabels}
            close={() => setSelectLabels(false)}
          />
          <div className="bg-grey-100 br-3 border-none flex flex-row items-center">
            <div className="w-1/2 flex mr-0.5">
              <div className="date items-center font-85 font-500 flex no-select">
                Start Date
              </div>
              <input
                name="startDate"
                className="default ml-auto px-2 py-1 border-none focus:drop-shadow"
                type="date"
                value={state.startDate}
                onChange={updateState}
              />
            </div>
            <div className="ml-0.5 w-1/2 flex">
              <div className="ml-1 date items-center float-left font-85 flex no-select">
                Due Date
              </div>
              <input
                name="endDate"
                className="default ml-auto px-2 py-1 border-none focus:drop-shadow"
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
