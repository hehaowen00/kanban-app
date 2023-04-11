// object for storing the UI state
// if cardId is not set, then labelModal has been opened outside of a card
export type UIState = {
  cardId: string,
  listId: string,
  showCard: boolean,
  showSettings: boolean,

  showAddLabel: boolean,
  showSelectLabel: boolean,
  showEditLabel: boolean,
  editLabel: string,
  history: Partial<UIState> | undefined,
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
  id: string,
  title: string,
  description: string,
  startDate: string,
  endDate: string,
  labels: string[],
  checklists: string[],
  attachments: string[],
  comments: Comment[],
};

export type Label = {
  id: string,
  name: string,
  color: string,
  index: string[],
};

export type Checklist = {
  id: string,
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
