import { v4 as uuidV4 } from "uuid";

function newExampleBoard()  {
  let cardId = uuidV4();

  let cards: any = {};
  cards[cardId] = {
    id: uuidV4(),
    title: "Hello, World!",
    description: "",
    attachments: [] as any[],
    comments: [] as any[],
    checklists: [] as any[],
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
  };
}

const ExampleBoard = newExampleBoard();

export default ExampleBoard;
