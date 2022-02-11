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

type BoardAction = RenameBoard;
type ListAction = NewList | MoveList;
type CardAction = MoveCard | NewCard | UpdateCard;
type ChecklistAction = AddChecklist | DeleteChecklist | MoveChecklist | UpdateChecklist | AddChecklistItem;
type ChecklistItemAction = DeleteChecklistItem | UpdateChecklistItem;
type Action = BoardAction | ListAction | CardAction | ChecklistAction | ChecklistItemAction;

export default Action;
