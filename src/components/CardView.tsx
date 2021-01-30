import React, { ReactElement } from "react";

import "./styles/CardView.css";

function KanbanCardView({ visible }: Props): ReactElement {
  return (
    <div
      className="list card-view"
      style={{ display: visible ? "block" : "none" }}
    >
      <div className="list-header">{"Title"}</div>
    </div>
  );
}

type Props = {
  visible: boolean;
};

export default KanbanCardView;
