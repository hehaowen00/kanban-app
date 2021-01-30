import { v4 as uuidV4 } from "uuid";

export const initialState = {
  id: uuidV4(),
  name: "Kanban 1",
  lists: [
    {
      id: uuidV4(),
      name: "List 1",
      cards: [
        {
          id: uuidV4(),
          title: "Hello, World!",
          description: "Description",
          checklists: [],
          attachments: [],
          comments: [],
        },
      ],
    },
    {
      id: uuidV4(),
      name: "List 2",
      cards: [
        {
          id: uuidV4(),
          title:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit.Est quo numquam facilis reprehenderit accusantium minus rerum voluptatibus.Provident amet consequuntur accusantium cumque necessitatibus, vel illum iusto quibusdam, itaque, dolorem rem.",
          description: "Description",
          checklists: [
            {
              id: 1,
              description: "Task 1",
              status: false
            }
          ],
          attachments: [],
          comments: [],
        },
        {
          id: uuidV4(),
          title: "Hello, World!",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit.Suscipit porro quibusdam, laudantium maxime adipisci veniam dolor earum quisquam! Iste totam repellendus placeat quo est sapiente neque, odio sint facere sequi.",
          checklists: [],
          attachments: [],
          comments: [],
        },
        {
          id: uuidV4(),
          title: "Hello, World!",
          description: "pneumonoultramicroscopicsilicovolcanoconiosis",
          checklists: [],
          attachments: [],
          comments: [],
        },
        {
          id: uuidV4(),
          title: "Hello, World!",
          description: "Description",
          checklists: [],
          attachments: [],
          comments: [],
        },
        {
          id: uuidV4(),
          title: "Hello, World!",
          description: "Description",
          checklists: [],
          attachments: [],
          comments: [],
        },
        {
          id: uuidV4(),
          title: "Hello, World!",
          description: "Description",
          checklists: [],
          attachments: [],
          comments: [],
        },
        {
          id: uuidV4(),
          title: "Hello, World!",
          description: "Description",
          checklists: [],
          attachments: [],
          comments: [],
        },
        {
          id: uuidV4(),
          title: "Hello, World!",
          description: "Description",
          checklists: [],
          attachments: [],
          comments: [],
        },
        {
          id: uuidV4(),
          title: "Hello, World!",
          description: "Description",
          checklists: [],
          attachments: [],
          comments: [],
        },
        {
          id: uuidV4(),
          title: "Hello, World!",
          description: "Description",
          checklists: [],
          attachments: [],
          comments: [],
        },
        {
          id: uuidV4(),
          title: "Hello, World!",
          description: "Description",
          checklists: [],
          attachments: [],
          comments: [],
        },
        {
          id: uuidV4(),
          title: "Hello, World!",
          description: "Description",
          checklists: [],
          attachments: [],
          comments: [],
        },
        {
          id: uuidV4(),
          title: "Hello, World!",
          description: "Description",
          checklists: [],
          attachments: [],
          comments: [],
        },
        {
          id: uuidV4(),
          title: "Hello, World!",
          description: "Description",
          checklists: [],
          attachments: [],
          comments: [],
        },
        {
          id: uuidV4(),
          title: "Hello, World!",
          description: "Description",
          checklists: [],
          attachments: [],
          comments: [],
        },
      ],
    },
    {
      id: uuidV4(),
      name: "pneumonoultramicroscopicsilicovolcanoconiosis",
      cards: [
        {
          id: uuidV4(),
          title: "Hello, World!",
          description: "",
          checklists: [],
          attachments: [],
          comments: [],
        },
      ],
    },
    {
      id: uuidV4(),
      name: "List 4",
      cards: [],
    },
    {
      id: uuidV4(),
      name: "List 5",
      cards: [],
    },
  ],
};

function BoardReducer(state = initialState, action: Number) {
  return state;
}

export default BoardReducer;
