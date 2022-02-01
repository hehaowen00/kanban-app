import React, { Fragment, ReactElement, useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { connect } from "react-redux";

import { Board, List } from "../types/Kanban";
import KanbanList from "./List";
import KanbanAddList from "./AddList";
import KanbanCardView from "./CardView";
import Navbar from "./Navbar";

import "./styles/Board.css";

function KanbanBoard({ board, moveList, moveCard }: Props): ReactElement {
  const lists = board.lists;

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
        moveList(srcIndex, destIndex);
        break;
      }
      case "droppableCards": {
        moveCard({ srcId, srcIndex, destId, destIndex });
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
          <KanbanCardView />
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
  moveList: any,
  moveCard: any,
};

const mapStateToProps = (state: any, props: any) => {
  return {
    board: state.board,
    ...props,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    moveList: (src: number, dest: number) => dispatch({type: "MoveList", src, dest }),
    moveCard: (payload: any) => dispatch({type: "MoveCard", ...payload }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(KanbanBoard);
