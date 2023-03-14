import { ReactElement } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { ShowExistingCard } from "../redux/Creators";

import { AppState } from "../redux/Store";

import "./styles/Card.css"

function CardView({ index, id, listId }: Props): ReactElement {
  const dispatch = useDispatch();

  const { title, labels } = useSelector(({ board }: AppState) => {
    const { title, labels } = board.cards[id];
    let xs = labels.map((id: string) => {
      return { id, ...board.labels[id] };
    });
    return {
      title,
      labels: xs,
    };
  });

  const sorted = labels.sort((a: any, b: any) => {
    if (a.name > b.name) {
      return 1;
    }
    return -1;
  });

  const handleClick = () => {
    dispatch(ShowExistingCard(id, listId));
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          className="card bg-white br-3 no-select drop-shadow hover:bg-gray-100"
          key={id}
          onClick={handleClick}

          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="card-title font-85 px-2 py-1">
            {title}
          </div>
          {labels.length > 0 && (
            <div className="card-labels mb-[4px]">
              {labels.map(({ id, name }: any) =>
                <div key={id} className="badge br-default br-3 font-75 font-600 inline-block no-select">
                  {name}
                </div>
              )}
            </div>
          )}
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
