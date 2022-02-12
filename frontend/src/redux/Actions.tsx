import { Card, Checklist, ChecklistItem } from "../types/Kanban";

export type RenameBoard = {
  type: "RenameBoard",
  name: string,
};

export type UpdateCard = {
  type: "UpdateCard",
  cardId: string,
  patch: Partial<Card>,
};

export type MoveCard = {
  type: "MoveCard",
  srcId: string,
  destId: string,
  srcIdx: number,
  destIdx: number,
};

export type MoveList = {
  type: "MoveList",
  srcIdx: number,
  destIdx: number,
};

export type NewCard = {
  type: "NewCard",
  listId: string,
  card: Card,
};

export type NewList = {
  type: "NewList",
  name: string,
};

export type AddChecklist = {
  type: "AddChecklist",
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
  patch: Partial<Checklist>,
};

export type AddChecklistItem = {
  type: "AddChecklistItem",
  checklistId: string,
  item: string,
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
  patch: Partial<ChecklistItem>,
};

export type AddComment = {
  type: "AddComment",
  userId: string,
  cardId: string,
  text: string,
};

type BoardAction = RenameBoard;
type ListAction =  MoveList | NewList;
type CardAction = MoveCard | NewCard | UpdateCard;
type CommentAction = AddComment;

type ChecklistAction = AddChecklist | DeleteChecklist | MoveChecklist | UpdateChecklist;
type ChecklistItemAction = AddChecklistItem | DeleteChecklistItem | UpdateChecklistItem;

type Action = BoardAction | ListAction | CardAction | ChecklistAction | ChecklistItemAction | CommentAction;

export default Action;
