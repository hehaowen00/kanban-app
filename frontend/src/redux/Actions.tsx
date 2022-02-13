import { Card, Checklist, ChecklistItem, List } from "../types/Kanban";

export type RenameBoard = {
  type: "RenameBoard",
  name: string,
};

export type NewCard = {
  type: "NewCard",
  listId: string,
  title: string,
};

export type NewList = {
  type: "NewList",
  name: string,
};

export type UpdateCard = {
  type: "UpdateCard",
  id: string,
  delta: Partial<Card>,
};

export type UpdateList = {
  type: "UpdateList",
  id: string,
  delta: Partial<List>,
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

export type NewComment = {
  type: "NewComment",
  userId: string,
  cardId: string,
  text: string,
};

type BoardAction = RenameBoard;
type ListAction =  MoveList | NewList | UpdateList;
type CardAction = MoveCard | NewCard | UpdateCard;
type CommentAction = NewComment;

type ChecklistAction = NewChecklist | DeleteChecklist | MoveChecklist | UpdateChecklist;
type ChecklistItemAction = NewChecklistItem | DeleteChecklistItem | UpdateChecklistItem;

type Action = BoardAction | ListAction | CardAction | ChecklistAction | ChecklistItemAction | CommentAction;

export default Action;
