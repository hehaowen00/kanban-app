import { ReactElement } from "react";
import { Draggable } from "react-beautiful-dnd";

import { useDispatch, useSelector } from "react-redux";

import "./styles/Card.css"

function KanbanCard({ index, id }: Props): ReactElement {
  const cardObject = useSelector((state: any) => { return { ...state.board.cards[id] }});
  const { title, description } = cardObject;
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch({ type: "ShowExistingCard", cardId: id });
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          className="card noselect"
          key={id}
          ref={provided.innerRef}
          onClick={handleClick}
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
  id: any;
};

export default KanbanCard;
