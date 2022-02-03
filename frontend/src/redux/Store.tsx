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
      let cards = { ...state.cards };
      let list = lists.find((list: any) => list.id === listId);

      if (list !== undefined) {
        let cardId = uuidV4();
        cards[cardId] = {
          title: "Title",
          description: "",
          attachments: [] as any[],
          comments: [] as any[],
          checklists: [] as any[],
        };
        list.cardIds = [...list.cardIds, cardId];
      }

      return { ...state, cards, lists };
    }
    case "NewList": {
      const { name } = action;
      let lists = [...state.lists, { id: uuidV4(), name, cardIds: [] }];
      return { ...state, lists };
    }
    case "MoveCard": {
      const { srcId, srcIdx, destId, destIdx } = action; 
      let lists = [...state.lists];
      let srcListIdx = lists.findIndex((list: List) => list.id === srcId);

      if (srcListIdx === -1) {
        return state;
      }

      if (srcId === destId) {
        let cards = reorder(lists[srcListIdx].cardIds, srcIdx, destIdx); 
        lists[srcListIdx].cardIds = cards;

        return { ...state, lists };
      }

      let destListIdx = lists.findIndex((list: List) => list.id === destId);
      
      if (destListIdx === -1) {
        return state;
      }

      let card = lists[srcListIdx].cardIds.splice(srcIdx, 1);
      let destCards = insert(lists[destListIdx].cardIds, destIdx, card[0]);

      const modifiedSrcList = { ...lists[srcListIdx] };
      const modifiedDestList = { ...lists[destListIdx], cardIds: destCards };

      lists[srcListIdx] = modifiedSrcList;
      lists[destListIdx] = modifiedDestList;

      return { ...state, lists };
    }
    case "MoveList": {
      const { srcIdx, destIdx } = action;
      let lists = reorder(state.lists, srcIdx, destIdx);
      return { ...state, lists };
    }
    default: {
      return state;
    }
  }
}
    
function reorder(list: any[], startIdx: number, endIdx: number): any[] {
  const arr = Array.from(list);
  const [removed] = arr.splice(startIdx, 1);

  arr.splice(endIdx, 0, removed);
  return arr;
}

function insert(arr: any[], idx: number, element: any): any[] {
  return [...arr.slice(0, idx), element, ...arr.slice(idx)];
}

export default createStore(reducer as any, composeWithDevTools());
