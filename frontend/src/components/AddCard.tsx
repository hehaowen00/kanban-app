import { ReactElement } from "react";
import { Draggable } from "react-beautiful-dnd";

import { Card } from "../types/Kanban";
import { connect, useDispatch } from "react-redux";

import "./styles/Card.css"
import TextareaAutosize from "react-autosize-textarea/lib";

function AddCard({  }: Props): ReactElement {
  const dispatch = useDispatch();

  const addCard = () => {
  };

  return (
    <div
      className="card noselect"
    >
      <div className="card-title">
      <TextareaAutosize
      className=""
      placeholder="New Card"
      maxLength={512}
      value={""}
      />
      </div>
    </div>
  );
}

type Props = {
};

export default AddCard;
