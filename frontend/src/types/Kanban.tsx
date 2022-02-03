export type Board = {
  id: string;
  name: string;
  cards: Record<string, Card>,
  lists: List[];
};

export type List = {
  id: string;
  name: string;
  cardIds: string[];
};

export type Card = {
  title: string;
  description: string;
  checklists: ChecklistItem[];
  attachments: Attachment[];
  comments: Comment[];
};

export type ChecklistItem = {
  id: number;
  description: string;
  status: boolean;
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

