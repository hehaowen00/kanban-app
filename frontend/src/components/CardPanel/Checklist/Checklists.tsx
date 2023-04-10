import { useState } from "react";
import { useDispatch } from "react-redux";

import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import Checklist from "./Checklist";

import { moveChecklist, moveChecklistItem } from "../../../redux/Reducers/Board";

function Checklists({ cardId, checklists }: Props) {
  const dispatch = useDispatch();
  const [dragging, setDragging] = useState(false);

  const dragStart = () => {
    setDragging(true);
  };

  const dragEnd = (event: DropResult) => {
    setDragging(false);
    const { source, destination } = event;

    if (!destination) {
      return;
    }

    const srcIdx = source.index;
    const destIdx = destination.index;
    const srcId = source.droppableId;
    const destId = destination.droppableId;

    let action = undefined;

    switch (event.type) {
      case "droppableChecklists": {
        action = moveChecklist({ cardId, srcIdx, destIdx });
        break;
      }
      case "droppableItems": {
        action = moveChecklistItem({ srcId, srcIdx, destId, destIdx });
        break;
      }
    };

    if (action !== undefined) {
      dispatch(action);
    }
  };

  return (
    <DragDropContext onDragStart={dragStart} onDragEnd={dragEnd}>
      <Droppable
        droppableId="checklists"
        type="droppableChecklists"
        direction="vertical"
      >
        {(provided: any) => (
          <div
            className="checklists"
            ref={provided.innerRef}
          >
            {checklists.map((id: string, index: number) => (
              <Checklist
                key={id}
                cardId={cardId}
                id={id}
                index={index}
                dragging={dragging}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

interface Props {
  cardId: string,
  checklists: string[],
}

export default Checklists;
