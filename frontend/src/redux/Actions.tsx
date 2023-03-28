import { Card, Checklist, ChecklistItem, List } from "../Types/Kanban";

export type RenameBoard = {
  type: "RenameBoard",
  name: string,
};

export type NewLabel = {
  type: "NewLabel",
  name: string,
  color: string,
  card: string | null,
};

export type DeleteLabel = {
  type: "DeleteLabel",
  cardId: string,
  labelId: string,
};

export type AddLabel = {
  type: "AddLabel",
  cardId: string,
  labelId: string,
};

export type RemoveLabel = {
  type: "RemoveLabel",
  cardId: string,
  labelId: string,
};

// List

export type NewList = {
  type: "NewList",
  name: string,
};

export type DeleteList = {
  type: "DeleteList",
  id: string,
};

export type MoveList = {
  type: "MoveList",
  srcIdx: number,
  destIdx: number,
};

export type UpdateList = {
  type: "UpdateList",
  id: string,
  delta: Partial<List>,
};

// Card

export type NewCard = {
  type: "NewCard",
  listId: string,
  title: string,
};

export type MoveCard = {
  type: "MoveCard",
  srcId: string,
  destId: string,
  srcIdx: number,
  destIdx: number,
};

export type UpdateCard = {
  type: "UpdateCard",
  id: string,
  delta: Partial<Card>,
};

export type DeleteCard = {
  type: "DeleteCard",
  cardId: string,
  listId: string,
};

// Checklist

export type NewChecklist = {
  type: "NewChecklist",
  cardId: string,
  title: string,
};

export type DeleteChecklist = {
  type: "DeleteChecklist",
  cardId: string,
  checklistId: string,
};

export type MoveChecklist = {
  type: "MoveChecklist",
  cardId: string,
  srcIdx: number,
  destIdx: number,
};

export type UpdateChecklist = {
  type: "UpdateChecklist",
  checklistId: string,
  delta: Partial<Checklist>,
};

export type NewChecklistItem = {
  type: "NewChecklistItem",
  checklistId: string,
  item: string,
};

export type MoveChecklistItem = {
  type: "MoveChecklistItem",
  srcId: string,
  srcIdx: number,
  destId: string,
  destIdx: number,
};

export type DeleteChecklistItem = {
  type: "DeleteChecklistItem",
  checklistId: string,
  index: number,
};

export type UpdateChecklistItem = {
  type: "UpdateChecklistItem",
  checklistId: string,
  index: number,
  delta: Partial<ChecklistItem>,
};

// Comments

export type NewComment = {
  type: "NewComment",
  userId: string,
  cardId: string,
  text: string,
};

// Labels

export type NewLabelModal = {
  type: "NewLabelModal"
}

type BoardAction = RenameBoard
  | NewLabel
  | AddLabel
  | RemoveLabel;

type ListAction = NewList
  | MoveList
  | UpdateList
  | DeleteList;

type CardAction = NewCard
  | MoveCard
  | UpdateCard
  | DeleteCard;

type CommentAction = NewComment;

type ChecklistAction = NewChecklist
  | DeleteChecklist
  | MoveChecklist
  | UpdateChecklist;

type ChecklistItemAction = NewChecklistItem
  | MoveChecklistItem
  | DeleteChecklistItem
  | UpdateChecklistItem;

type Action = BoardAction
  | ListAction
  | CardAction
  | ChecklistAction
  | ChecklistItemAction
  | CommentAction
  | NewLabelModal;

export default Action;
