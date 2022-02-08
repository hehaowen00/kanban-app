import { v4 as uuidV4 } from "uuid";

function newExampleBoard()  {
  let cardId = uuidV4();
  let checklistId = uuidV4();

  let cards: any = {};
  cards[cardId] = {
    title: "Hello, World!",
    description: "",
    attachments: [] as any[],
    checklists: [checklistId],
    comments: [] as any[],
  };

  let checklists: any = {};
  checklists[checklistId] = {
    title: "Checklist 1",
    items: [
      { status: false, description: "Item 1", },
    ]
  };

  return {
    id: uuidV4(),
    name: "Kanban",
    cards,
    lists: [
      {
        id: uuidV4(),
        name: "List 1",
        cardIds: [cardId]
      }
    ],
    attachments: {
    },
    checklists,
  };
}

const ExampleBoard = newExampleBoard();

export default ExampleBoard;