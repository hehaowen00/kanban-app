import { Fragment, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

import { Board, List } from "../types/Kanban";
import KanbanList from "./List";
import KanbanAddList from "./AddList";
import CardPanel from "./CardView";
import Navbar from "./Navbar";

import "./styles/Board.css";

function KanbanBoard(): ReactElement {
  const board = useSelector((state: any)  => state.board);
  const cardView = useSelector((state: any) => state.cardView);
  const dispatch = useDispatch();

  const lists = board.lists;
  const { visible } = cardView;

  const focusLost = () => {
    dispatch({ type: "CloseCardView" });
  };

  const handleDragEvent = (event: DropResult) => {
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
                <div
                  className="lists"
                  ref={provided.innerRef}
                  style={{opacity: visible ? 0.4 : 1.0}}
                  onClickCapture={visible ? focusLost : undefined}
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
          { visible && <CardPanel /> }
        </div>
      </div>
      <div className="footer">
      </div>
    </Fragment>
  );
}

export default KanbanBoard;
