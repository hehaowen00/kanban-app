import { Fragment, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

import { List } from "../types/Kanban";
import KanbanList from "./List";
import AddList from "./AddList";
import CardPanel from "./CardPanel";
import AddCard from "./AddCard";
import Navbar from "./Navbar";

import "./styles/Board.css";
import { MoveCard, MoveList } from "../redux/Creators";

function Board(): ReactElement {
  const dispatch = useDispatch();

  const board = useSelector((state: any)  => state.board);
  const lists = board.lists;

  const cardView = useSelector((state: any) => state.panel);
  const { visible } = cardView;

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
      case "droppableCards": {
        action = MoveCard(srcId, destId, srcIdx, destIdx);
        break;
      }
      case "droppableLists": {
        action = MoveList(srcIdx, destIdx);
        break;
      }
      default: {
        return;
      }
    }

    dispatch(action);
  };

  return (
    <div className="board-view">
      { visible === "NewCard" && <AddCard /> }
      { visible === "ShowCard" && <CardPanel /> }
      <Navbar name={board.name} />
      <div className="board flex flex-1 flex-col">
        <div className="content flex flex-row">
          <DragDropContext
            onDragEnd={handleDragEnd}
          >
            <Droppable
              droppableId="lists"
              type="droppableLists"
              direction="horizontal"
            >
              {(provided) => (
                <div
                  className="lists flex flex-row flex-1-1"
                  ref={provided.innerRef}
                >
                  {lists.map((list: List, index: number) => (
                    <KanbanList key={list.id} index={index} list={list} />
                  ))}
                  {provided.placeholder}
                  <AddList />
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}

export default Board;
