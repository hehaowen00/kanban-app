import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";

import AddChecklistView from "./AddChecklist";
import ChecklistView from "./Checklist";

import { MoveChecklist, MoveChecklistItem } from "../../../redux/Creators";
import { AppState } from "../../../redux/Store";

function ChecklistsView({ cardId }: Props) {
  const dispatch = useDispatch();

  const { checklists } = useSelector(({ board }: AppState) => board.cards[cardId]);

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
        action = MoveChecklist(cardId, srcIdx, destIdx);
        break;
      }
      case "droppableItems": {
        action = MoveChecklistItem(srcId, srcIdx, destId, destIdx);
        break;
      }
      default: {
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

type Props = {
  cardId: string,
};

export default ChecklistsView;
