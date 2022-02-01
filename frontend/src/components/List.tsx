import React, { ReactElement } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";

import { Card, List } from "../types/Kanban";
import KanbanCard from "./Card";

import "./styles/List.css";

function KanbanList({ index, list, cards, addCard }: Props): ReactElement {
  const { id, name } = list;

  const handleAddItem = () => {
    addCard(id);
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
                  {cards.map((card: Card, index: number) => (
                    <KanbanCard key={id} card={card} index={index} />
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
  list: List;
  addCard: any,
  cards: Card[],
};

const mapStateToProps = (state: any, props: any) => {
  const { list } = props;
  let cards = list.cards.map((el: any) => state.board.cards[el]);
  return {
    cards,
    ...props,
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addCard: (listId: string) => dispatch({type: "NewCard", payload: listId}),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(KanbanList);
