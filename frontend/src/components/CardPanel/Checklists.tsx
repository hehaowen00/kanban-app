import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";

import AddChecklist from "../Checklist/AddChecklist";
import Checklist from "./Checklist";

import { MoveChecklist } from "../../redux/Creators";

function Checklists({ cardId, state }: Props) {
  const dispatch = useDispatch();

  const { checklists } = useSelector((state: any) => state.board.cards[cardId]);
  const { active, setActive } = state;

  const handleDragEnd = (event: DropResult) => {
    const { source, destination } = event;

    if (!destination) {
      return;
    }

    const srcIdx = source.index;
    const destIdx = destination.index;

    if (srcIdx === destIdx) {
      return;
    }

    let action = MoveChecklist(cardId, srcIdx, destIdx);
    dispatch(action);
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
            <Checklist key={id} index={index} cardId={cardId} id={id} />
          ))}
          {provided.placeholder}
          {active && (
             <AddChecklist cardId={cardId} close={() => setActive(false)} />
          )}
        </div>
      )}
      </Droppable>
    </DragDropContext>
  );
}

type Props = {
  cardId: string,
  state: any,
};

export default Checklists;
