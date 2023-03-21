import { v4 as uuidV4 } from "uuid";
import { createStore, combineReducers } from "redux";

import { Board, CardViewState, List } from "../types/Kanban";
import ExampleBoard from "../types/example";
import BoardAction from "./Actions";
import CardPanelAction from "./CardPanelActions";
import { useRef } from "react";

const EmptyCard = {
  title: "",
  description: "",
  startDate: "",
  endDate: "",
  labels: [],
  attachments: [],
  checklists: [],
  comments: [],
};

const DefaultCardViewState = {
  cardId: "",
  listId: "",
  showCard: false,
  showMenu: false,
};

const UIState = {
  showLabelModal: false,
};

function CardViewReducer(state: CardViewState = DefaultCardViewState, action: CardPanelAction) {
  switch (action.type) {
    case "CloseCardView": {
      return {
        ...state,
        cardId: "",
        listId: "",
        showCard: false,
      }
    }
    case "ShowExistingCard": {
      const { cardId, listId, } = action;
      return {
        ...state,
        cardId,
        listId,
        showCard: true,
      };
    }
    case "ShowMenu": {
      return {
        ...state,
        showMenu: !state.showMenu,
      };
    }
    default:
      return state;
  }
}

function BoardReducer(state: Board = ExampleBoard, action: BoardAction) {
  switch (action.type) {
    case "RenameBoard": {
      const { name } = action;
      return { ...state, name };
    }
    case "NewLabel": {
      let id = uuidV4();
      let newLabel = action.name;
      let labels = { ...state.labels };

      for (const key in labels) {
        let { name } = labels[key];
        if (name === newLabel) {
          return state;
        }
      }

      labels[id] = {
        name: newLabel,
      };

      // add new label to card if label was created using cardpanel
      let card = action.card;

      if (card !== null) {
        let cards = { ...state.cards };
        let labels = [...cards[card].labels];
        cards[card].labels = [...labels, id];
      }

      return { ...state, labels };
    }
    case "AddLabel": {
      const { cardId, labelId } = action;
      let cards = { ...state.cards };
      let labels = [...cards[cardId].labels];
      if (labels.includes(labelId)) {
        return state;
      }
      cards[cardId].labels = [...labels, labelId];
      return { ...state, cards };
    }
    case "RemoveLabel": {
      const { cardId, labelId } = action;
      let cards = { ...state.cards };
      let labels = cards[cardId].labels.filter((id: string) => id !== labelId);
      cards[cardId].labels = [...labels];
      return { ...state, cards };
    }
    case "NewCard": {
      const { listId, title } = action;

      let lists = [...state.lists];
      let cards = { ...state.cards };
      let list = lists.find((list: List) => list.id === listId);

      if (list !== undefined) {
        let cardId = uuidV4();
        cards[cardId] = {
          ...EmptyCard,
          title,
        };
        list.cardIds = [...list.cardIds, cardId];
      }

      return { ...state, cards, lists };
    }
    case "UpdateCard": {
      const { id, delta } = action;

      let cards = { ...state.cards };
      cards[id] = { ...cards[id], ...delta };

      return { ...state, cards: { ...cards } };
    }
    case "DeleteCard": {
      const { cardId, listId } = action;

      let cards = { ...state.cards };
      delete cards[cardId];

      let lists = [...state.lists];
      let idx = lists.findIndex((list: List) => list.id === listId);

      if (idx === -1) {
        return state;
      }

      let list = lists[idx];
      let res = list.cardIds.indexOf(cardId);

      if (res === -1) {
        return state;
      }

      list.cardIds.splice(res, 1);

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
    case "UpdateList": {
      const { id, delta } = action;
      let lists = [...state.lists];
      let idx = lists.findIndex((list) => list.id === id);

      if (idx !== -1) {
        lists[idx] = { ...lists[idx], ...delta };
        return { ...state, lists };
      }

      return state;
    }
    case "DeleteList": {
      const { id } = action;

      let lists = [...state.lists];
      let idx = lists.findIndex((list) => list.id === id);
      let deleted = lists.splice(idx, 1);
      let { cardIds } = deleted[0];

      let cards = { ...state.cards };
      for (let cardId in cardIds) {
        delete cards[cardId];
      }

      return { ...state, cards, lists };
    }
    case "NewChecklist": {
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
      const { checklistId, delta } = action;
      let checklist = { ...state.checklists[checklistId], ...delta };

      let checklists = { ...state.checklists };
      checklists[checklistId] = checklist;

      return { ...state, checklists, };
    }
    case "NewChecklistItem": {
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
    case "MoveChecklistItem": {
      const { srcId, srcIdx, destId, destIdx } = action;
      let checklists = { ...state.checklists };

      let items = [...checklists[srcId].items];
      let el = items.splice(srcIdx, 1);
      checklists[srcId].items = items;

      items = [...checklists[destId].items];
      items = insert(items, destIdx, el[0]);
      checklists[destId].items = items;

      return { ...state, checklists };
    }
    case "DeleteChecklistItem": {
      const { checklistId, index } = action;
      let checklists = { ...state.checklists };
      let checklist = checklists[checklistId];

      let items = [...checklist.items];
      items.splice(index);

      checklist.items = [...items];
      checklists[checklistId] = { ...checklist };

      return { ...state, checklists };
    }
    case "UpdateChecklistItem": {
      const { checklistId, index, delta } = action;

      let checklists = { ...state.checklists };
      let checklist = checklists[checklistId];
      let items = [...checklist.items];

      items[index] = { ...items[index], ...delta };
      checklists[checklistId].items = items;

      return { ...state, checklists };
    }
    case "NewComment": {
      const { userId, cardId, text } = action;
      let cards = { ...state.cards };
      let comment_ = { userId, timestamp: Date.now(), text };

      let comments = [...cards[cardId].comments, comment_];
      cards[cardId].comments = comments;

      return { ...state, cards };
    }
    default: {
      return state;
    }
  }
}

function UIReducer(state: any = UIState, action: any) {
  switch (action.type) {
    case "ShowLabelModal": {
      const cardId = action.payload;
      return { ...state, showLabelModal: true, cardId };
    }
    case "HideLabelModal": {
      return { ...state, showLabelModal: false };
    }
    default: {
      return state;
    }
  }
}

function reorder<Type>(list: Type[], startIdx: number, endIdx: number): Type[] {
  const arr = Array.from(list);
  const [removed] = arr.splice(startIdx, 1);

  arr.splice(endIdx, 0, removed);
  return arr;
}

function insert<Type>(arr: Type[], idx: number, element: Type): Type[] {
  if (idx === 0) {
    return [element, ...arr];
  }
  return [...arr.slice(0, idx), element, ...arr.slice(idx)];
}

const appReducer = combineReducers({
  board: BoardReducer,
  panel: CardViewReducer,
  ui: UIReducer,
});

export type AppState = ReturnType<typeof appReducer>;
export default createStore(appReducer);
