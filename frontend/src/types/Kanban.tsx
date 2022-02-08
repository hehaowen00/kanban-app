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


type PartialCard = {
  title?: string;
  description?: string;
  comments?: Comment[];
  attachments?: string[];
  checklists?: string[];
};

export type Card = {
  title: string;
  description: string;
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
  id: number;
  author: number;
  content: string;
  date: Date;
};

export type Attachment = {
  id: number;
  author: string,
  filename: string;
  link: string;
};

