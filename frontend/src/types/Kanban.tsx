export type CardViewState = {
  cardId: string,
  listId: string,
  showCard: boolean,
};

export type Board = {
  id: string;
  name: string;
  cards: Record<string, Card>,
  labels: string[],
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
  labels: Label[],
  checklists: string[];
  attachments: string[];
  comments: Comment[];
};

export type Label = {
  title: string,
  color: string,
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

