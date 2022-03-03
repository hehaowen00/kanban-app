import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

import AddListView from "./AddList";
import CardPanel from "./CardPanel";
import ListView from "./List";
import Navbar from "./Navbar";
import SettingsView from "./Settings";

import { List } from "../types/Kanban";
import { MoveCard, MoveList } from "../redux/Creators";
import { AppState } from "../redux/Store";

import "./styles/Board.css";

function BoardView() {
  const dispatch = useDispatch();

  const { lists, labels, name } = useSelector(({ board }: AppState) => board);

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
        action = MoveCard(srcId, destId, srcIdx, destIdx);
        break;
      }
      case "lists": {
        action = MoveList(srcIdx, destIdx);
        break;
      }
      default: {
        return;
      }
    }

    dispatch(action);
  };

  const dragStart = () => {
    dispatch({type: "CloseCardView" });
  };

  const { listId } = useSelector((state: AppState) => state.panel);

  return (
    <div className="board-view">
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
                      { listId === list.id && (
                        <>
                          <div className="card-view-cover bg-none"></div>
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
          <SettingsView labels={labels} />
        </div>
      </div>
    </div>
  );
}

export default BoardView;
