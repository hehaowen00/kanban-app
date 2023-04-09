import { v4 as uuidV4 } from "uuid";
import { Card, Checklist, Label } from "./Kanban";

function newExampleBoard() {
  let cardId = uuidV4();
  let checklist1 = uuidV4();
  let checklist2 = uuidV4();
  let labelId = uuidV4();

  let cards: Record<string, Card> = {};

  cards[cardId] = {
    id: cardId,
    title: "Hello, World!",
    description: "I *support* **Markdown** !\n```\nprint('Hello, World!')\n```\n![Image](vite.svg)",
    labels: [labelId],
    startDate: "2023-03-01",
    endDate: "2023-03-31",
    attachments: [] as any[],
    checklists: [checklist1, checklist2],
    comments: [] as any[],
  };

  let checklists: Record<string, Checklist> = {};

  checklists[checklist1] = {
    id: checklist1,
    title: "Checklist 1 (Click me!)",
    items: [
      { status: false, description: "Edit checklist name", },
    ]
  };

  checklists[checklist2] = {
    id: checklist2,
    title: "Checklist 2",
    items: [
      { status: false, description: "Drag and drop checklist 1 below", },
    ]
  };

  let labels: Record<string, Label> = {
    [labelId]: {
      id: labelId,
      name: "Hello World!",
      color: "#a855f7",
      index: [cardId],
    }
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
