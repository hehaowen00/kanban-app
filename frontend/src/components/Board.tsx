import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";

import AddListView from "./List/AddList";
import CardPanel from "./CardPanel/CardPanel";
import LabelModal from "./Labels/AddLabelModal";
import ListView from "./List/List";
import Navbar from "./Navbar";
import SettingsView from "./Settings/Settings";

import { moveCard, moveList } from "../redux/Reducers/Board";
import { closeCardView } from "../redux/Reducers/UI";
import { AppState } from "../redux/Store";
import { List } from "../types/Kanban";

import "../styles/Board.css"

function BoardView() {
  const dispatch = useDispatch();

  const { lists, labels, name } = useSelector(({ board }: AppState) => board);
  const showModal = useSelector(({ ui }: any) => {
    return ui.showLabelModal;
  });

  const ui = useSelector((state: AppState) => state.ui);
  const { listId, showSettings } = ui;

  const handleDragEnd = (event: DropResult) => {
    const { source, destination } = event;

    if (!destination) {
      return;
    }

    const srcIdx = source.index;
    const destIdx = destination.index;
    const srcId = source.droppableId;
    const destId = destination.droppableId;

    if (srcIdx === destIdx && srcId === destId) {
      return;
    }

    let action = undefined;

    switch (event.type) {
      case "cards": {
        action = moveCard({ srcId, destId, srcIdx, destIdx });
        break;
      }
      case "lists": {
        action = moveList({ srcIdx, destIdx });
        break;
      }
      default: {
        return;
      }
    }

    dispatch(action);
  };

  const dragStart = () => {
    dispatch(closeCardView());
  };

  return (
    <>
      {showModal && <LabelModal />}
      <div className="board-view bg-sky-700">
        <Navbar name={name} />
        <div className="board flex flex-1 flex-col">
          <div className="content flex flex-row">
            <DragDropContext
              onDragStart={dragStart}
              onDragEnd={handleDragEnd}
            >
              <Droppable
                droppableId="lists"
                type="lists"
                direction="horizontal"
              >
                {(provided) => (
                  <div
                    className="lists flex flex-row flex-1-1"
                    ref={provided.innerRef}
                  >
                    {lists.map((list: List, index: number) => (
                      <>
                        <ListView key={list.id} index={index} list={list} />
                        {listId === list.id && (
                          <>
                            {/* <div className="card-view-cover bg-none"></div> */}
                            <CardPanel />
                          </>
                        )}
                      </>
                    ))}
                    {provided.placeholder}
                    <AddListView />
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            {showSettings && <SettingsView labels={labels} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default BoardView;
