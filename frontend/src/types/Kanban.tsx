export type CardViewState = {
  cardId: string,
  listId: string,
  showCard: boolean,
  showMenu: boolean,
};

export type Board = {
  id: string;
  name: string;
  lists: List[];
  cards: Record<string, Card>,
  labels: Record<string, Label>,
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
  // dates: {
  //   startDate: string,
  //   endDate: string
  // } | null;
  startDate: string,
  endDate: string,
  labels: string[],
  checklists: string[];
  attachments: string[];
  comments: Comment[];
};

export type Label = {
  name: string,
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

