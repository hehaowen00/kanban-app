import { Fragment, ReactElement } from "react";
import { connect } from "react-redux";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

import { Board, List } from "../types/Kanban";
import KanbanList from "./List";
import KanbanAddList from "./AddList";
import KanbanCardView from "./CardView";
import Navbar from "./Navbar";

import "./styles/Board.css";

function KanbanBoard({ board, moveCard, moveList }: Props): ReactElement {
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
      case "droppableCards": {
        moveCard(srcId, destId, srcIndex, destIndex);
        break;
      }
      case "droppableLists": {
        moveList(srcIndex, destIndex);
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

type Props = {
  board: Board;
  moveCard: any,
  moveList: any,
};

const mapStateToProps = (state: any, props: any) => {
  return {
    board: state,
    ...props,
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    moveList: (srcIdx: any, destIdx: any) => dispatch({type: "MoveList", srcIdx, destIdx }),
    moveCard: (srcId: string, destId: string, srcIdx: number, destIdx: number) => {
      dispatch({type: "MoveCard", srcId, destId, srcIdx, destIdx });
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(KanbanBoard);
