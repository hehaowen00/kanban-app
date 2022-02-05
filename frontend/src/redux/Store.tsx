import { v4 as uuidV4 } from "uuid";
import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { Board, CardViewState, List } from "../types/Kanban";
import ExampleBoard from "../types/example";
import Action from "./Actions";

const EmptyCard = {
  title: "",
  description: "",
  attachments: [] as any[],
  comments: [] as any[],
  checklists: [] as any[],
};

const DefaultCardViewState = {
  currentListId: null,
  currentCardId: null,
  inputs: {
    comment: "",
  },
  isNewCard: false,
  tempCard: {...EmptyCard},
  visible: false,
};

function CardViewReducer(state: CardViewState = DefaultCardViewState, action: any) {
  switch (action.type) {
    case "CloseCardView": {
      return {
        currentListId: null,
        currentCardId: null,
        isNewCard: false,
        visible: false,
        inputs: {
          "comment": "",
        },
        tempCard: EmptyCard,
      }
    }
    case "PromptNewCard": {
      const { listId } = action;
      return {
        ...state,
        currentListId: listId,
        isNewCard: true,
        visible: true,
      }
    }
    case "ShowExistingCard": {
      const { cardId, cardObject } = action;
      return {
        ...state,
        currentCardId: cardId,
        tempCard: cardObject,
        visible: true,
      };
    }
    case "UpdateInput": {
      const { field, value } = action;

      let inputs = { ...state.inputs };
      inputs[field] = value;

      return { ...state, inputs, };
    }
    case "UpdateCardState": {
      const { patch } = action;
      let tempCard = {
        ...state.tempCard,
        ...patch,
      };

      return { ...state, tempCard };
    }
    default:
      return state;
  }
}

function BoardReducer(state: Board = ExampleBoard, action: Action) {
  switch (action.type) {
    case "RenameBoard": {
      const { name } = action;
      return { ...state, name };
    }
    case "NewCard": {
      const { listId, card } = action;

      let lists = [...state.lists];
      let cards = { ...state.cards };
      let list = lists.find((list: any) => list.id === listId);

      if (list !== undefined) {
        let cardId = uuidV4();
        cards[cardId] = {
          ...card,
        };
        list.cardIds = [...list.cardIds, cardId];
      }

      return { ...state, cards, lists };
    }
    case "UpdateCard": {
      const { cardId, patch } = action;

      let cards = { ...state.cards };
      cards[cardId] = { ...cards[cardId], ...patch };

      let stateM = { ...state, cards: { ...cards} };

      return stateM;
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

const reducer = combineReducers({
  board: BoardReducer,
  cardView: CardViewReducer,
});

export default createStore(reducer as any, composeWithDevTools());
