import { Action } from "../../types/Kanban";

export function AddList(name: string): Action {
  return {
    type: "AddList",
    payload: name
  }
}

export function DeleteList(id: string): Action {
  return {
    type: "DeleteList",
    payload: id
  };
}

export function MoveList(id: string, src: number, dest: number): Action {
  return {
    type: "MoveList",
    payload: {
      id,
      src,
      dest
    }
  };
}

export function RenameList(id: string, name: string): Action {
  return {
    type: "RenameList",
    payload: {
      id,
      name
    }
  };
}
