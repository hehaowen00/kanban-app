export type Board = {
  id: string;
  name: string;
  lists: List[];
};

export type List = {
  id: string;
  name: string;
  cards: Card[];
};

export type Card = {
  id: string;
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

