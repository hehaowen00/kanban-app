import { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Draggable } from "@hello-pangea/dnd";

import { showExistingCard } from "../../redux/Reducers/UI";
import { AppState } from "../../redux/Store";

import "../../styles/Card.css"

function Card({ index, id, listId }: Props): ReactElement {
  const dispatch = useDispatch();

  const { title, labels, startDate, endDate } = useSelector(({ board }: AppState) => {
    const { title, labels, startDate, endDate } = board.cards[id];
    let xs = labels.map((id: string) => {
      return { ...board.labels[id], id };
    });
    return {
      title,
      labels: xs,
      startDate,
      endDate
    };
  });

  const handleClick = () => {
    dispatch(showExistingCard({ cardId: id, listId }));
  };

  const formatDate = (dateString: string) => {
    if (dateString === "") {
      return "";
    }

    let date = new Date(dateString);
    let s = date.toLocaleDateString('en-GB', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    return s;
  }

  // TODO: Show date in format of MMM DD, YYYY - MMM DD, YYYY
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
          <div className="card-title font-90 px-2 py-1">
            {title}
          </div>
          {(startDate != "" || endDate != "") &&
            <>
              <div className="px-2 text-cyan-900">
                {startDate != "" && formatDate(startDate) + " "}- {formatDate(endDate)}
              </div>
              <div className="pb-1"></div>
            </>
          }
          {labels.length > 0 && (
            <div className="card-labels px-2 pb-[6px]">
              {labels.map(({ id, name, color }: any) =>
                <div
                  key={id}
                  className="badge br-3 font-500 inline-block no-select
                   text-white text-xs"
                  style={{
                    backgroundColor: color,
                  }}
                >
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

interface Props {
  key: string;
  index: number;
  id: string;
  listId: string,
}

export default Card;
