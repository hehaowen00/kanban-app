import { Action } from "../../types/Kanban";

export function RenameBoard(name: string): Action {
  return {
    type: "RenameBoard",
    title: name
  };
}

