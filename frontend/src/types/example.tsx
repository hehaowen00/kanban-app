import { v4 as uuidV4 } from "uuid";

function newExampleBoard() {
  let cardId = uuidV4();
  let checklistId = uuidV4();
  let checklist2 = uuidV4();

  let cards: any = {};
  cards[cardId] = {
    title: "Hello, World!",
    description: "I *support* **Markdown** !\n```\nprint('Hello, World!')\n```\n![Image](vite.svg)",
    labels: [],
    startDate: "2023-03-01",
    endDate: "2023-03-31",
    attachments: [] as any[],
    checklists: [checklistId, checklist2],
    comments: [] as any[],
  };

  let checklists: any = {};
  checklists[checklistId] = {
    title: "Checklist 1 (Click me!)",
    items: [
      { status: false, description: "Edit checklist name", },
    ]
  };
  checklists[checklist2] = {
    title: "Checklist 2",
    items: [
      { status: false, description: "Drag and drop checklist 1 below", },
    ]
  };

  let labels: any = {
  };

  return {
    id: uuidV4(),
    name: "Kanban App",
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
