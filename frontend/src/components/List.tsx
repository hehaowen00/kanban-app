import { ChangeEvent, KeyboardEvent, ReactElement, useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-autosize-textarea/lib";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";

import AddCard from "./AddCard";
import CardView from "./Card";

import { DeleteList, UpdateList } from "../redux/Creators";
import { List } from "../types/Kanban";

import { MAX_LIST_TITLE_LENGTH } from "../types/Limits";
import "./styles/List.css";

function ListView({ index, list }: Props): ReactElement {
  const dispatch = useDispatch();
  const ref = useRef<HTMLTextAreaElement>(null);

  const { id, name, cardIds } = list;
  const [visible, setVisible] = useState(false);

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
    dispatch(DeleteList(id));
  };

  const updateList = (payload: Partial<List>) => {
    dispatch(UpdateList(id, payload));
  };

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

  const headerClasses = `list-header ${visible ? "z-2" : ""}`;

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
            <div className="list br-3 bg-white flex flex-1-1 flex-col shadow slide-in">
              <div className={headerClasses}>
                {!visible && (
                  <div
                    className="title font-90 no-select"
                    onClick={onClick}
                    {...provided.dragHandleProps}
                  >
                    {name}
                  </div>
                )}
                {visible && (
                  <>
                    <TextareaAutosize
                      ref={ref}
                      className="default font-85 font-600"
                      maxLength={MAX_LIST_TITLE_LENGTH}
                      onChange={onChange}
                      onKeyDown={onKeyDown}
                      onKeyPress={onKeyPress}
                      value={listInput}
                    />
                    <div className="menu mb-0 inline spaced-right text-right float-right">
                      <button className="default mt-5" onClick={deleteList}>
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
              <Droppable droppableId={id} type="cards">
                {(provided) => (
                  <div
                    className="list-body flex flex-1 flex-col relative"
                    ref={provided.innerRef}
                  >
                    {cardIds.map((cardId: string, index: number) => (
                      <CardView key={cardId} index={index} id={cardId} listId={id} />
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
              {!newCard && (
                <div className="list-footer br-3 flex flex-col font-80 font-600 no-select">
                  <button
                    className="add-card-btn default mb-[5px] px-[3px] py-[0px] hover:cursor-pointer"
                    onClick={handleAddItem}
                  >
                    Add Card
                  </button>
                </div>
              )}
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
  list: List,
};

export default ListView;
