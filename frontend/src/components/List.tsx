import { ReactElement } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";

import KanbanCard from "./Card";

import "./styles/List.css";

function KanbanList({ index, list }: Props): ReactElement {
  const { id, name, cardIds } = list;
  const dispatch = useDispatch();

  const handleAddItem = () => {
    dispatch({ type: "PromptNewCard", listId: id }); 
  };

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
                  {cardIds.map((id: string, index: number) => (
                    <KanbanCard key={id} index={index} id={id} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <div className="list-footer noselect" onClick={handleAddItem}>
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
  list: any,
};

export default KanbanList;
