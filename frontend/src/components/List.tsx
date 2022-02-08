import { ReactElement, useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-autosize-textarea/lib";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";

import KanbanCard from "./Card";

import "./styles/List.css";

function KanbanList({ index, list }: Props): ReactElement {
  const { id, name, cardIds } = list;
  const dispatch = useDispatch();

  const handleAddItem = () => {
    dispatch({ type: "NewCardPrompt", listId: id }); 
  };

  const [visible, setVisible] = useState(false);

  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!visible) {
      return;
    }

    if (ref.current !== null) {
      ref.current.focus();
      let length: any = ref.current.value.length;
      ref.current.selectionStart = length;
      ref.current.selectionEnd = length;
    }
  }, [visible]);

  const showInput = () => {
    setVisible(true);
  }


  const blur = () => {
    setVisible(false);
  }

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
              {!visible &&
              <div
                className="header-row"
                onClick={showInput}
              >
                {name}
              </div>}
              {visible &&
              <TextareaAutosize 
                ref={ref}
                className="default font-85 font-600"
                onBlur={blur}
                value={name}
              />}
            </div>
            <Droppable droppableId={id} type="droppableCards">
              {(provided) => (
                <div
                  className="list-body"
                  ref={provided.innerRef}
                >
                  {cardIds.map((id: string, index: number) => (
                    <KanbanCard key={id} index={index} id={id} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <div className="list-footer noselect">
              <button className="default" onClick={handleAddItem}>
              {"Add Item"}
              </button>
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
