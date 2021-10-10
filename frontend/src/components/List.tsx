import React, { ReactElement } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

import { Card, List } from "../types/Kanban";
import KanbanCard from "./Card";

import "./styles/List.css";

function KanbanList({ index, list }: Props): ReactElement {
  const { id, name, cards } = list;

  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided) => (
        <div
          className="list-col"
          ref={provided.innerRef}
          key={index}
          {...provided.draggableProps}
        >
          <div className="list">
            <div className="list-header" {...provided.dragHandleProps}>
              <div className="header-row">{name}</div>
            </div>
            <Droppable droppableId={id} type="droppableCards">
              {(provided) => (
                <div className="list-body" ref={provided.innerRef}>
                  {cards.map((card: Card, index: number) => (
                    <KanbanCard key={card.id} index={index} card={card} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <div className="list-footer noselect">
              {"Add Item"}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

type Props = {
  key: string;
  index: number;
  list: List;
};

export default KanbanList;
