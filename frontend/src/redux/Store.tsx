import { v4 as uuidV4 } from "uuid";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { Board, List } from "../types/Kanban";
import ExampleBoard from "../types/example";
import Action from "./Actions";

function reducer(state: Board = ExampleBoard, action: Action) {
  switch (action.type) {
    case "RenameBoard": {
      const { name } = action;
      return { ...state, name };
    }
    case "NewCard": {
      const { listId } = action;

      let lists = [...state.lists];
      let list = lists.find((list: any) => list.id === listId);

      if (list !== undefined) {
        list.cards[list.cards.length] = {
          id: uuidV4(),
          title: "Title",
          description: "",
          attachments: [] as any[],
          comments: [] as any[],
          checklists: [] as any[],
        };
      }

      return { ...state, lists };
    }
    case "NewList": {
      const { name } = action;
      let lists = [...state.lists, { id: uuidV4(), name, cards: [] }];
      return { ...state, lists };
    }
    case "MoveList": {
      const { srcIdx, destIdx } = action;
      let lists = reorder(state.lists, srcIdx, destIdx);
      return { ...state, lists };
    }
    case "MoveCard": {
      const { srcId, srcIdx, destId, destIdx } = action; 
      let lists = [...state.lists];
      let srcListIdx = state.lists.findIndex((list: List) => list.id === srcId);

      if (srcListIdx !== -1 && srcId === destId) {
        let cards = reorder(lists[srcListIdx].cards, srcIdx, destIdx); 
        lists[srcListIdx].cards = cards;

        return { ...state, lists };
      }

      let destListIdx = state.lists.findIndex((list: List) => list.id === destId);
      let card = lists[srcListIdx].cards.splice(srcIdx, 1);
      lists[destListIdx].cards = lists[destListIdx].cards.concat(card);

      return { ...state, lists };
    }
    default: {
      return state;
    }
  }
}
    
function reorder(list: any[], startIdx: number, endIdx: number): any[] {
  const lists = Array.from(list);
  const [removed] = lists.splice(startIdx, 1);

  lists.splice(endIdx, 0, removed);
  return lists;
}

export default createStore(reducer as any, composeWithDevTools());
