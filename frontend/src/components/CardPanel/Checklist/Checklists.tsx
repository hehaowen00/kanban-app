import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { useDispatch } from "react-redux";

import ChecklistView from "./Checklist";

import { moveChecklist, moveChecklistItem } from "../../../redux/Reducers/Board";

function ChecklistsView({ cardId, checklists }: Props) {
  const dispatch = useDispatch();

  const handleDragEnd = (event: DropResult) => {
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
    <DragDropContext onDragEnd={handleDragEnd}>
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
              <ChecklistView key={id} index={index} cardId={cardId} id={id} />
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

export default ChecklistsView;
