import { ReactElement } from "react";
import { Draggable } from "react-beautiful-dnd";

import { Card } from "../types/Kanban";
import { connect } from "react-redux";

import "./styles/Card.css"

function KanbanCard({ index, card }: Props): ReactElement {
  const { id, title, description } = card;

  const displayCard = () => {
    // showCard(id);
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          className="card noselect"
          key={id}
          ref={provided.innerRef}
          onClick={displayCard}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="card-title">{title}</div>
          {description !== "" && (
            <div className="card-description">{description}</div>
          )}
        </div>
      )}
    </Draggable>
  );
}

type Props = {
  key: string;
  index: number;
  card: Card;
};

export default KanbanCard;
