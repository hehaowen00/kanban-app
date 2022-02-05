import { Card } from "../types/Kanban";

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

type Action = RenameBoard | NewCard | UpdateCard | NewList | MoveCard | MoveList;

export default Action;
