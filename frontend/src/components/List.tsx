import { ChangeEvent, KeyboardEvent, ReactElement, useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-autosize-textarea/lib";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";

import Card from "./Card";

import "./styles/List.css";

import { UpdateList } from "../redux/Creators";

function List({ index, list }: Props): ReactElement {
  const dispatch = useDispatch();
  const ref = useRef<HTMLTextAreaElement>(null);

  const { id, name, cardIds } = list;
  const [visible, setVisible] = useState(false);

  const listId = id;
  let [listInput, setListInput] = useState(name);

  useEffect(() => {
    if (!visible) {
      return;
    }

    let current = ref.current;
    if (current) {
      current.focus();
      let { length } = current.value;
      current.selectionStart = length;
      current.selectionEnd = length;
    }
  }, [visible]);

  const handleAddItem = () => {
    dispatch({ type: "NewCardPrompt", listId: id }); 
  };

  const updateList = (payload: any) => {
    dispatch(UpdateList(id, payload));
  };

  const onBlur = () => {
    setVisible(false);
  }

  const onClick = () => {
    setVisible(true);
  }

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    let { value } = event.target;
    setListInput(value);
  };

  const onKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();

      let trimmed = listInput.trim();
      if (trimmed.length !== 0) {
        updateList({ name: trimmed });
      }

      setVisible(false);
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Escape") {
      setListInput(name);
      setVisible(false);
    }
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
          <div className="list br-3 bg-white flex flex-1-1 flex-col shadow">
            <div
              className="list-header bg-none br-3 flex flex-col font-90 font-600"
              {...provided.dragHandleProps}
            >
              {!visible &&
              <div
                className="title font-85"
                onClick={onClick}
              >
                {name}
              </div>}
            {visible && (
              <TextareaAutosize 
                ref={ref}
                className="default font-85 font-600"
                onBlur={onBlur}
                onChange={onChange}
                onKeyDown={onKeyDown}
                onKeyPress={onKeyPress}
                value={listInput}
              />
            )}
            </div>
            <Droppable droppableId={id} type="droppableCards">
              {(provided) => (
                <div
                  className="list-body flex flex-1 flex-col relative"
                  ref={provided.innerRef}
                >
                  {cardIds.map((id: string, index: number) => (
                    <Card key={id} index={index} id={id} listId={listId} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <div className="list-footer br-3 flex flex-col font-80 font-600 noselect">
              <button
                className="default add-card-btn"
                onClick={handleAddItem}
              >
                Add Card
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

export default List;
