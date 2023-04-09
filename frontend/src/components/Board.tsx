import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";

import AddListView from "./List/AddList";
import CardPanel from "./CardPanel/CardPanel";
import ListView from "./List/List";
import Navbar from "./Navbar";
import SettingsView from "./Settings/Settings";

import NewLabelModal from "./Labels/AddLabelModal";
import EditLabelModal from "./Labels/EditLabelModal";
import SelectLabelModal from "./Labels/SelectLabelModal";

import { moveCard, moveList } from "../redux/Reducers/Board";
import { closeCardView } from "../redux/Reducers/UI";
import { AppState } from "../redux/Store";
import { List } from "../types/Kanban";

import "../styles/Board.css"

function BoardView() {
  const dispatch = useDispatch();

  const { lists, labels, name } = useSelector(({ board }: AppState) => board);
  const { listId, showAddLabel, showEditLabel, showSelectLabel, showSettings } =
    useSelector(({ ui }: AppState) => ui);

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

    if (event.type === "cards") {
      dispatch(moveCard({ srcId, destId, srcIdx, destIdx }));
    } else if (event.type === "lists") {
      dispatch(moveList({ srcIdx, destIdx }));
    }
  };

  const dragStart = () => {
    dispatch(closeCardView());
  };


  const label = useSelector(({ board, ui }: AppState) => {
    return board.labels[ui.editLabel];
  });


  return (
    <>
      {showAddLabel && <NewLabelModal />}
      {showSelectLabel && <SelectLabelModal />}
      {showEditLabel && <EditLabelModal />}
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
                      <div key={`${list.id}-container`} className="flex flex-row">
                        <ListView key={list.id} index={index} list={list} />
                        {listId === list.id && (
                          <CardPanel />
                        )}
                      </div>
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
