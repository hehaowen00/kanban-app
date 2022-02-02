import { Card } from "../types/Kanban";

export type RenameBoard = {
  type: "RenameBoard",
  name: string,
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
  name: string,
};

export type NewList = {
  type: "NewList",
  name: string,
};

export type UpdateCard = {
  type: "UpdateCard",
  listId: string,
  card: Card,
};

type Action = RenameBoard | NewCard | NewList | MoveCard | MoveList;

export default Action;
