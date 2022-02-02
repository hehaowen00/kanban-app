import { v4 as uuidV4 } from "uuid";
const ExampleBoard = {
  id: uuidV4(),
  name: "Kanban",
  lists: [
    {
      id: uuidV4(),
      name: "List 1",
      cards: [
        {
          id: uuidV4(),
          title: "Hello, World!",
          description: "",
          attachments: [] as any[],
          comments: [] as any[],
          checklists: [] as any[],
        }
      ]
    }
  ],
};

export default ExampleBoard;
