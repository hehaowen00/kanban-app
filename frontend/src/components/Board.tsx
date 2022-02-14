import { Fragment, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

import { List } from "../types/Kanban";
import KanbanList from "./List";
import KanbanAddList from "./AddList";
import CardPanel from "./CardPanel";
import AddCard from "./AddCard";
import Navbar from "./Navbar";

import "./styles/Board.css";
import { MoveCard, MoveList } from "../redux/Creators";

function KanbanBoard(): ReactElement {
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

    const lookup = {
      "droppableCards": () => dispatch(MoveCard(srcId, destId, srcIdx, destIdx)),
      "droppableLists": () => dispatch(MoveList(srcIdx, destIdx)),
    } as any;

    lookup[event.type]();
  };

  return (
    <Fragment>
      { visible === "NewCard" && <AddCard /> }
      { visible === "ShowCard" && <CardPanel /> }
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
        </div>
      </div>
    </Fragment>
  );
}

export default KanbanBoard;
