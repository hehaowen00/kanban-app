import { v4 as uuidV4 } from "uuid";

function newExampleBoard()  {
  let cardId = uuidV4();
  let checklistId = uuidV4();

  let cards: any = {};
  cards[cardId] = {
    title: "Hello, World!",
    description: "",
    labels: [],
    attachments: [] as any[],
    checklists: [checklistId],
    comments: [] as any[],
  };

  let checklists: any = {};
  checklists[checklistId] = {
    title: "Checklist 1",
    items: [
      { status: false, description: "Item 1", },
      { status: true, description: "Item 2", },
    ]
  };

  let labels: any = {
  };

  return {
    id: uuidV4(),
    name: "Kanban",
    cards,
    checklists,
    labels,
    lists: [
      {
        id: uuidV4(),
        name: "List 1",
        cardIds: [cardId]
      }
    ],
    attachments: {},
  };
}

const ExampleBoard = newExampleBoard();

export default ExampleBoard;
