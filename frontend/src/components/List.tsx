import { ChangeEvent, KeyboardEvent, ReactElement, useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-autosize-textarea/lib";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";

import Card from "./Card";
import CardPanel from "./CardPanel";

import "./styles/List.css";

import { UpdateList } from "../redux/Creators";
import AddCard from "./AddCard";

function List({ index, list }: Props): ReactElement {
  const dispatch = useDispatch();
  const ref = useRef<HTMLTextAreaElement>(null);

  const { id, name, cardIds } = list;
  const [visible, setVisible] = useState(false);

  const cardView = useSelector((state: any) => state.panel);
  const thisList = cardView.listId === id;
  const { showCard } = cardView;
  console.log('list', thisList, showCard);

  const [listInput, setListInput] = useState(name);
  const [newCard, setNewCard] = useState(false);

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
    setNewCard(true);
  };

  const deleteList = () => {
    dispatch({ type: "DeleteList", id });
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
          className="list-view flex flex-row"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
        <div
          className="list-col"
          key={index}
        >
          <div className="list br-3 bg-white flex flex-1-1 flex-col shadow">
            <div className="list-header bg-none br-3 flex flex-col font-90 font-600">
              {!visible &&
              <div
                className="title font-85 no-select"
                onClick={onClick}
                {...provided.dragHandleProps}
              >
                {name}
              </div>}
              <button className="default" onClick={deleteList}>
              Delete
              </button>
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
            <Droppable droppableId={id} type="cards">
              {(provided) => (
                <div
                  className="list-body flex flex-1 flex-col relative"
                  ref={provided.innerRef}
                >
                  {cardIds.map((cardId: string, index: number) => (
                    <Card key={cardId} index={index} id={cardId} listId={id} />
                  ))}
                  {provided.placeholder}
                  {newCard && (
                    <AddCard
                      listId={id}
                      close={() => setNewCard(false)}
                    />
                  )}
                </div>
              )}
            </Droppable>
            <div className="list-footer br-3 flex flex-col font-80 font-600 no-select">
              <button
                className="default add-card-btn"
                onClick={handleAddItem}
              >
                Add Card
              </button>
            </div>
          </div>
        </div>
        { thisList && showCard && <CardPanel /> }
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
