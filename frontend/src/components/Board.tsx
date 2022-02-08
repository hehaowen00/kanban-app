import { Fragment, ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

import { Board, List } from "../types/Kanban";
import KanbanList from "./List";
import KanbanAddList from "./AddList";
import CardPanel from "./CardPanel";
import NewCardPanel from "./NewCardPanel";
import Navbar from "./Navbar";

import "./styles/Board.css";

function KanbanBoard(): ReactElement {
  const board = useSelector((state: any)  => state.board);
  const cardView = useSelector((state: any) => state.panel);
  const dispatch = useDispatch();

  const lists = board.lists;
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

    const lookup = {
      "droppableCards": () => dispatch({ type: "MoveCard", srcId, destId, srcIdx, destIdx }),
      "droppableLists": () => dispatch({ type: "MoveList", srcIdx, destIdx }),
    } as any;

    lookup[event.type]();
  };

  return (
    <Fragment>
      { visible === "NewCard" && <NewCardPanel /> }
      <Navbar name={board.name} />
      <div className="col">
        <div className="content">
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
                  className="lists"
                  ref={provided.innerRef}
                >
                  {lists.map((list: List, index: number) => (
                    <KanbanList key={list.id} index={index} list={list} />
                  ))}
                  {provided.placeholder}
                  <KanbanAddList />
                </div>
              )}
            </Droppable>
          </DragDropContext>
          { visible === "ShowCard" && <CardPanel /> }
        </div>
      </div>
    </Fragment>
  );
}

export default KanbanBoard;
