import React, { ReactElement } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";

import { Card, List } from "../types/Kanban";
import KanbanCard from "./Card";

import "./styles/List.css";

function KanbanList({ index, list, newCard }: Props): ReactElement {
  const { id, name, cards } = list;

  const handleAddItem = () => {
    newCard(id);
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
                  {cards.map((card: CardRef, index: number) => (
                    <KanbanCard key={card.id} card={card} index={index} />
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

type CardRef = {
  id: string,
  title: string,
};

type ListRef = {
  id: string,
  name: string,
  cards: CardRef[]
};

type Props = {
  key: string;
  index: number;
  list: ListRef,
  newCard: any,
};

const mapStateToProps = (state: any, props: any) => {
  const { id, name, cardIds } = state.lists[props.index];
  const cards = cardIds.map((id: string) => {
    const { title } = state.cards[id];
    return { id, title };
  });
  return {
    list: { id, name, cards },
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    newCard: (listId: string) => dispatch({type: "NewCard", listId }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(KanbanList);
