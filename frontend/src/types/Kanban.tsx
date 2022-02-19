export type CardViewState = {
  cardId: string | null,
  listId: string | null,
  visible: "NewCard" | "ShowCard" | null,
};

export type Board = {
  id: string;
  name: string;
  cards: Record<string, Card>,
  lists: List[];
  attachments: Record<string, Attachment>,
  checklists: Record<string, Checklist>,
};

export type List = {
  id: string;
  name: string;
  cardIds: string[];
};


export type Card = {
  title: string;
  description: string;
  dueDate: number | null,
  comments: Comment[];
  attachments: string[];
  checklists: string[];
};

export type Checklist = {
  title: string,
  items: ChecklistItem[],
};

export type ChecklistItem = {
  status: boolean;
  description: string;
};

export type Comment = {
  userId: string;
  timestamp: number;
  text: string;
};

export type Attachment = {
  author: string,
  filename: string;
  link: string;
};

