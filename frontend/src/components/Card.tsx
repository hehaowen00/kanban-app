import { ReactElement } from "react";
import { Draggable } from "react-beautiful-dnd";

import { useDispatch, useSelector } from "react-redux";

import "./styles/Card.css"

function Card({ index, id, listId }: Props): ReactElement {
  const dispatch = useDispatch();

  const cardObject = useSelector((state: any) => {
    return { ...state.board.cards[id] };
  });

  const { title } = cardObject;

  const { cardId } = useSelector((state: any) => {
    return { ...state.panel };
  });

  const handleClick = () => {
    dispatch({ type: "ShowExistingCard", cardId: id, listId });
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          className="card bg-white br-3 noselect shadow"
          key={id}
          onClick={handleClick}

          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="card-title">{title}</div>
        </div>
      )}
    </Draggable>
  );
}

type Props = {
  key: string;
  index: number;
  id: any;
  listId: string,
};

export default Card;
