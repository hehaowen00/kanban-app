import { ReactElement } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";

import { AppState } from "../redux/Store";

import "./styles/Card.css"

function CardView({ index, id, listId }: Props): ReactElement {
  const dispatch = useDispatch();

  const { title } = useSelector((state: AppState) => {
    return { ...state.board.cards[id] };
  });

  const handleClick = () => {
    dispatch({ type: "ShowExistingCard", cardId: id, listId });
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          className="card bg-white br-3 no-select shadow"
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
  id: string;
  listId: string,
};

export default CardView;
