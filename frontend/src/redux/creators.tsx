import { Card, Checklist, ChecklistItem, List } from "../types/Kanban";

// Board

export function RenameBoard(name: string) {
  return { type: "RenameBoard", name };
}

// List

export function NewList(name: string) {
  return { type: "NewList", name };
}

export function MoveList(srcIdx: number, destIdx: number) {
  return { type: "MoveList", srcIdx, destIdx };
}

export function UpdateList(id: string, delta: Partial<List>) {
  return { type: "UpdateList", id, delta };
}

export function DeleteList() {
}

// Card

export function NewCard(listId: string, title: string) {
  return { type: "NewCard", listId, title };
}

export function MoveCard(
  srcId: string,
  destId: string,
  srcIdx: number,
  destIdx: number
) {
  return { type: "MoveCard", srcId, destId, srcIdx, destIdx };
}

export function UpdateCard(id: string, delta: Partial<Card>) {
  return { type: "UpdateCard", id, delta };
}

export function DeleteCard(id: string) {
  return { type: "DeleteCard", id };
}

// Checklist

export function NewChecklist(cardId: string, title: string) {
  return { type: "NewChecklist", cardId, title };
}

export function MoveChecklist(cardId: string, srcIdx: number, destIdx: number) {
  return { type: "MoveChecklist", cardId, srcIdx, destIdx };
}

export function UpdateChecklist(
  checklistId: string,
  delta: Partial<Checklist>
) {
  return { type: "UpdateChecklist", checklistId, delta };
}

export function DeleteChecklist(cardId: string, checklistId: string) {
  return { type: "DeleteChecklist", cardId, checklistId };
}

export function NewChecklistItem(checklistId: string, item: string) {
  return { type: "NewChecklistItem", checklistId, item };
}

export function UpdateChecklistItem(
  checklistId: string,
  index: number,
  delta: Partial<ChecklistItem>
) {
  return { type: "UpdateChecklistItem", checklistId, index, delta };
}

export function DeleteChecklistItem(checklistId: string, index: number) {
  return { type: "DeleteChecklistItem", checklistId, index };
}

// Comment

export function NewComment(userId: string, cardId: string, text: string) {
  return { type: "NewComment", userId, cardId, text };
}
