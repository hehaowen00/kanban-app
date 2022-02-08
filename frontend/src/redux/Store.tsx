import { v4 as uuidV4 } from "uuid";
import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { Board, CardViewState, List } from "../types/Kanban";
import ExampleBoard from "../types/example";
import Action from "./Actions";

const EmptyCard = {
  title: "",
  description: "",
  attachments: [],
  checklists: [],
  comments: [],
};

const DefaultCardViewState = {
  cardId: null,
  listId: null,
  visible: null,
};

function CardViewReducer(state: CardViewState = DefaultCardViewState, action: any) {
  switch (action.type) {
    case "CloseCardView": {
      return {
        cardId: null,
        listId: null,
        visible: null,
      }
    }
    case "NewCardPrompt": {
      const { listId } = action;
      return {
        cardId: null,
        listId,
        visible: "NewCard",
      }
    }
    case "ShowExistingCard": {
      const { cardId } = action;
      return {
        cardId,
        listId: null,
        visible: "ShowCard",
      };
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
          ...EmptyCard,
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

      const srcListIdx = lists.findIndex((list: List) => list.id === srcId);

      if (srcListIdx === -1) {
        return state;
      }

      if (srcId === destId) {
        let cards = reorder(lists[srcListIdx].cardIds, srcIdx, destIdx); 
        lists[srcListIdx].cardIds = cards;

        return { ...state, lists };
      }

      const destListIdx = lists.findIndex((list: List) => list.id === destId);
      if (destListIdx === -1) {
        return state;
      }

      const card = lists[srcListIdx].cardIds.splice(srcIdx, 1);
      const destCards = insert(lists[destListIdx].cardIds, destIdx, card[0]);

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
    case "AddChecklist": {
      const { cardId, title } = action;

      let checklists = { ...state.checklists };
      const id = uuidV4();
      checklists[id] = {
        title,
        items: [],
      };

      let cards = { ...state.cards };
      let existing = [...cards[cardId].checklists, id];
      cards[cardId].checklists = existing;

      return { ...state, cards, checklists, };
    }
    case "DeleteChecklist": {
      const { cardId, checklistId } = action;
      let cards = { ...state.cards };
      let checklistsArr = [...cards[cardId].checklists];
      let idx = checklistsArr.findIndex((id: string) => id === checklistId);
      if (idx !== -1) {
        checklistsArr.splice(idx, 1);
        cards[cardId].checklists = checklistsArr;

        let checklists = { ...state.checklists };
        delete checklists[checklistId];

        return { ...state, ...cards, checklists };
      }
      return state;
    }
    case "MoveChecklist": {
      const { cardId, srcIdx, destIdx } = action;

      let card = { ...state.cards[cardId] };
      let checklists = reorder(card.checklists, srcIdx, destIdx);
      card.checklists = checklists;

      let cards = { ...state.cards };
      cards[cardId] = card;

      return { ...state, cards, };
    }
    case "UpdateChecklist": {
      const { checklistId, patch } = action;
      let checklist = { ...state.checklists[checklistId], ...patch};

      let checklists = { ...state.checklists };
      checklists[checklistId] = checklist;

      return { ...state, checklists, };
    }
    case "AddChecklistItem": {
      const { checklistId, item } = action;
      let newItem = {
        status: false,
        description: item,
      };
      let checklists = { ...state.checklists };
      let checklist = checklists[checklistId];

      checklist.items.push(newItem);
      checklists[checklistId] = checklist;

      return { ...state, checklists };
    }
    case "UpdateChecklistItem": {
      const { checklistId, index, patch } = action;

      let checklists = { ...state.checklists };
      let checklist = checklists[checklistId];
      let items = [ ...checklist.items ];
      items[index] = { ...items[index], ...patch };
      checklists[checklistId].items = items;

      return { ...state, checklists };
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
  panel: CardViewReducer,
});

export default createStore(reducer as any, composeWithDevTools());
