import React, { Fragment, ReactElement, useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

import { Board, List } from "../types/Kanban";
import KanbanList from "./List";
import KanbanAddList from "./AddList";
import KanbanCardView from "./CardView";
import Navbar from "./Navbar";

import "./styles/Board.css";

function KanbanBoard({ board }: Props): ReactElement {
  const [lists, setLists] = useState(board.lists);
  const { name } = board;

  const handleDragEvent = (event: DropResult) => {
    const { source, destination } = event;

    if (!destination) {
      return;
    }

    const srcIndex = source.index;
    const destIndex = destination.index;

    const srcId = source.droppableId;
    const destId = destination.droppableId;

    if (srcIndex === destIndex && srcId === destId) {
      return;
    }

    switch (event.type) {
      case "droppableLists": {
        const reordered = reorder(lists, srcIndex, destIndex);
        setLists(reordered);
        break;
      }
      case "droppableCards": {
        const srcIdx = lists.findIndex((list) => list.id === srcId);
        const destIdx = lists.findIndex((list) => list.id === destId);

        const src = lists[srcIdx];
        const dest = lists[destIdx];

        const [removed] = src.cards.splice(srcIndex, 1);
        dest.cards.splice(destIndex, 0, removed);

        const reordered = lists;
        lists[srcIdx] = src;
        lists[destIdx] = dest;

        setLists(reordered);
        break;
      }
    }
  };

  return (
    <Fragment>
      <Navbar name={board.name} />
      <div className="col">
        <div className="content">
          <DragDropContext onDragEnd={handleDragEvent}>
            <Droppable
              droppableId="lists"
              type="droppableLists"
              direction="horizontal"
            >
              {(provided) => (
                <div className="lists" ref={provided.innerRef}>
                  {lists.map((list: List, index: number) => (
                    <KanbanList key={list.id} index={index} list={list} />
                  ))}
                  {provided.placeholder}
                  <KanbanAddList />
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <KanbanCardView visible={true} />
        </div>
      </div>
      <div className="footer">
      </div>
    </Fragment>
  );
}

function reorder(list: List[], startIdx: number, endIdx: number): List[] {
  const lists = Array.from(list);
  const [removed] = lists.splice(startIdx, 1);

  lists.splice(endIdx, 0, removed);
  return lists;
}


type Props = {
  board: Board;
};

export default KanbanBoard;
