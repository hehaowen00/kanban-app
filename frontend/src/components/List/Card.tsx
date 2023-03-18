import { ReactElement } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { useDispatch, useSelector } from "react-redux";
import { ShowExistingCard } from "../../redux/Creators";

import { AppState } from "../../redux/Store";

import moment from 'moment'

import "../../Styles/Card.css"

function CardView({ index, id, listId }: Props): ReactElement {
  const dispatch = useDispatch();

  const { title, labels, startDate, endDate } = useSelector(({ board }: AppState) => {
    const { title, labels, startDate, endDate } = board.cards[id];
    let xs = labels.map((id: string) => {
      return { id, ...board.labels[id] };
    });
    return {
      title,
      // description,
      labels: xs,
      startDate,
      endDate
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


  if (startDate !== "") {
    let date = new Date(startDate);
    let s = date.toLocaleDateString('en-GB', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  const formatDate = (dateString: string) => {
    if (dateString === "") {
      return "";
    }
    let date = new Date(dateString);
    let s = date.toLocaleDateString('en-GB', { month: 'short', day: 'numeric', year: 'numeric' });
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
                {startDate != "" && formatDate(startDate) + " - "}{formatDate(endDate)}
              </div>
              <div className="pb-[4px]"></div>
            </>
          }
          {labels.length > 0 && (
            <div className="card-labels px-2 pb-[6px]">
              {labels.map(({ id, name }: any) =>
                <div key={id} className="badge br-3 font-75 font-500 inline-block no-select bg-emerald-500 text-white">
                  {name}
                </div>
              )}
            </div>
          )}
          {/* <div className="px-2 py-1">
            {description}
          </div> */}
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
