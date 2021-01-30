import { Action } from "../../types/Kanban";

export function AddCard(listId: string, listIndex: number, text: string): Action {
  return {
    type: "AddCard",
    payload: {
      listId,
      listIndex,
      text
    }
  };
}

export function MoveCard(id: string, src: number, dest: number): Action {
  return {
    type: "MoveCard",
    payload: {
      id,
      src,
      dest
    }
  };
}

export function DeleteCard(id: string): Action {
  return {
    type: "DeleteCard",
    payload: id
  };
}

export function UpdateCard(id: string, text: string): Action {
  return {
    type: "UpdateCard",
    payload: {
      id,
      text
    }
  };
}

export function AddComment(cardId: string, description: string): Action {
  return {
    type: "AddComment",
    cardId,
    description
  };
}

export function AddTask(cardId: string, description: string): Action {
  return {
    type: "AddTask",
    payload: {
      cardId,
      description
    }
  }
}
