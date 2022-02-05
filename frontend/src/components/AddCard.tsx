import { ReactElement } from "react";
import { Draggable } from "react-beautiful-dnd";

import { Card } from "../types/Kanban";
import { connect } from "react-redux";

import "./styles/Card.css"
import CustomTextArea from "./custom/CustomTextArea";

function AddCard({  }: Props): ReactElement {

  const displayCard = () => {
    // showCard(id);
  };

  return (
        <div
          className="card noselect"
        >
          <div className="card-title">
          <CustomTextArea
          className=""
          placeholder="New Card"
          count={512}
          value={""}
          />
          </div>
        </div>
  );
}

type Props = {
};

export default AddCard;
