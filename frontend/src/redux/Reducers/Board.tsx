import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidV4 } from "uuid";

import { Board, Card, Checklist, ChecklistItem, List } from "../../types/Kanban";
import ExampleBoard from "../../types/Example";

const EmptyCard = {
  id: "",
  title: "",
  description: "",
  startDate: "",
  endDate: "",
  labels: [],
  attachments: [],
  checklists: [],
  comments: [],
};

const EmptyBoard: (id: string) => Board = (id: string) => {
  return {
    id,
    name: "",
    lists: [],
    cards: {},
    labels: {},
    attachments: {},
    checklists: {}
  };
};

interface RenameBoard {
  name: string,
}

interface NewList {
  name: string,
}

interface MoveList {
  srcIdx: number,
  destIdx: number,
}

interface UpdateList {
  id: string,
  partial: Partial<List>,
}

interface DeleteList {
  id: string,
}

interface NewCard {
  listId: string,
  title: string,
}

interface MoveCard {
  srcId: string,
  destId: string,
  srcIdx: number,
  destIdx: number,
}

interface UpdateCard {
  id: string,
  card: Partial<Card>,
}

interface DeleteCard {
  listId: string,
  cardId: string,
}

interface NewLabel {
  cardId: string,
  name: string,
  color: string,
}

interface DeleteLabel {
  id: string,
}

interface AddLabel {
  cardId: string,
  labelId: string,
}

interface RemoveLabel {
  cardId: string,
  labelId: string,
}

interface NewChecklist {
  cardId: string,
  name: string,
}

interface MoveChecklist {
  cardId: string,
  srcIdx: number,
  destIdx: number,
}

interface DeleteChecklist {
  cardId: string,
  checklistId: string,
}

interface UpdateChecklist {
  id: string,
  checklist: Partial<Checklist>,
}

interface NewChecklistItem {
  checklistId: string,
  description: string,
}

interface MoveChecklistItem {
  srcId: string,
  srcIdx: number,
  destId: string,
  destIdx: number,
}

interface UpdateChecklistItem {
  checklistId: string,
  index: number,
  item: Partial<ChecklistItem>,
}

interface DeleteChecklistItem {
  checklistId: string,
  index: number,
}

interface NewComment {
  userId: string,
  cardId: string,
  comment: string,
}

const boardSlice = createSlice({
  name: "Board",
  initialState: ExampleBoard as Board,
  reducers: {
    renameBoard: (state, action: PayloadAction<RenameBoard>) => {
      const name = action.payload.name;
      state.name = name;
    },

    newList: (state, action: PayloadAction<NewList>) => {
      const id = uuidV4();
      const name = action.payload.name;

      let list = { id, name, cardIds: [] };
      state.lists.push(list);
    },
    moveList: (state, action: PayloadAction<MoveList>) => {
      const { srcIdx, destIdx } = action.payload;
      state.lists = reorder(state.lists, srcIdx, destIdx);
    },
    updateList: (state, action: PayloadAction<UpdateList>) => {
      const { id, partial } = action.payload;

      const idx = state.lists.findIndex((list) => list.id === id);
      if (idx !== -1) {
        state.lists[idx] = { ...state.lists[idx], ...partial };
      }
    },
    deleteList: (state, action: PayloadAction<DeleteList>) => {
      const { id } = action.payload;

      let idx = state.lists.findIndex((list) => list.id === id);
      if (idx !== -1) {
        let deleted = state.lists.splice(idx, 1);
        let cardIds = deleted[0].cardIds;

        for (let cardId in cardIds) {
          delete state.cards[cardId];
        }
      }
    },

    newCard: (state, action: PayloadAction<NewCard>) => {
      const { listId, title } = action.payload;
      let list = findById(state.lists, listId);

      if (list !== undefined) {
        const id = uuidV4();
        state.cards[id] = { ...EmptyCard, id, title, };
        list.cardIds.push(id);
      }
    },
    moveCard: (state, action: PayloadAction<MoveCard>) => {
      const { srcId, srcIdx, destId, destIdx } = action.payload;

      const srcListIdx = findIndexById(state.lists, srcId);
      if (srcListIdx === -1) {
        return;
      }

      if (srcId === destId) {
        state.lists[srcListIdx].cardIds = reorder(
          state.lists[srcListIdx].cardIds, srcIdx, destIdx
        );
      } else {
        const destListIdx = findIndexById(state.lists, destId);
        if (destListIdx === -1) {
          return;
        }

        const card = state.lists[srcListIdx].cardIds.splice(srcIdx, 1);
        state.lists[destListIdx].cardIds.splice(destIdx, 0, card[0]);
      }
    },
    updateCard: (state, action: PayloadAction<UpdateCard>) => {
      const { id, card } = action.payload;
      state.cards[id] = { ...state.cards[id], ...card };
    },
    deleteCard: (state, action: PayloadAction<DeleteCard>) => {
      const { listId, cardId } = action.payload;

      for (let labelId in state.cards[cardId].labels) {
        state.labels[labelId].index.delete(cardId);
      }

      delete state.cards[cardId];

      const listIdx = findIndexById(state.lists, listId);
      if (listIdx === -1) {
        return;
      }

      const idx = state.lists[listIdx].cardIds.indexOf(cardId);
      if (idx === -1) {
        return;
      }

      state.lists[listIdx].cardIds.splice(idx, 1);
    },

    newLabel: (state, action: PayloadAction<NewLabel>) => {
      const { name, color } = action.payload;
      const id = uuidV4();

      for (const key in state.labels) {
        if (state.labels[key].name === name) {
          return;
        }
      }

      state.labels[id] = { id, name, color, index: new Set(), };

      const cardId = action.payload.cardId;
      if (cardId) {
        state.cards[cardId].labels.push(id);
        state.labels[id].index.add(cardId);
      }
    },
    deleteLabel: (state, action: PayloadAction<DeleteLabel>) => {
      const { id } = action.payload;
      const label = state.labels[id];

      for (let cardId in label.index) {
        state.cards[cardId].labels.delete(id);
      }
    },
    addLabel: (state, action: PayloadAction<AddLabel>) => {
      const { cardId, labelId } = action.payload;
      state.cards[cardId].labels.push(labelId);
      state.labels[labelId].index.add(cardId);
    },
    removeLabel: (state, action: PayloadAction<RemoveLabel>) => {
      const { cardId, labelId } = action.payload;
      const exists = state.cards[cardId].labels.has(labelId);

      if (exists) {
        state.cards[cardId].labels.delete(labelId);
        state.labels[labelId].index.delete(cardId);
      }
    },

    newChecklist: (state, action: PayloadAction<NewChecklist>) => {
      const { cardId, name } = action.payload;
      const id = uuidV4();

      state.checklists[id] = { id, title: name, items: [], };
      state.cards[cardId].checklists.push(id);
    },
    moveChecklist: (state, action: PayloadAction<MoveChecklist>) => {
      const { cardId, srcIdx, destIdx } = action.payload;

      let card = state.cards[cardId];
      card.checklists = reorder(card.checklists, srcIdx, destIdx);
    },
    updateChecklist: (state, action: PayloadAction<UpdateChecklist>) => {
      const { id, checklist } = action.payload;
      state.checklists[id] = Object.assign(state.checklists[id], checklist);
    },
    deleteChecklist: (state, action: PayloadAction<DeleteChecklist>) => {
      const { cardId, checklistId } = action.payload;
      const idx = state.cards[cardId].checklists.indexOf(checklistId);

      if (idx !== -1) {
        state.cards[cardId].checklists.splice(idx, 1);
        delete state.checklists[checklistId];
      }
    },

    newChecklistItem: (state, action: PayloadAction<NewChecklistItem>) => {
      const { checklistId, description } = action.payload;
      const item = {
        status: false,
        description,
      };

      state.checklists[checklistId].items.push(item);
    },
    moveChecklistItem: (state, action: PayloadAction<MoveChecklistItem>) => {
      const { srcId, srcIdx, destId, destIdx } = action.payload;
      const el = state.checklists[srcId].items.splice(srcIdx, 1);
      state.checklists[destId].items.splice(destIdx, 0, el[0]);
    },
    updateChecklistItem: (state, action: PayloadAction<UpdateChecklistItem>) => {
      const { checklistId, index, item } = action.payload;
        state.checklists[checklistId].items[index] = Object.assign(
        state.checklists[checklistId].items[index],
        item
      );
    },
    deleteChecklistItem: (state, action: PayloadAction<DeleteChecklistItem>) => {
      const { checklistId, index } = action.payload;
      state.checklists[checklistId].items.splice(index, 1);
    },

    newComment: (state, action: PayloadAction<NewComment>) => {
      const { userId, cardId, comment } = action.payload;

      state.cards[cardId].comments.push({
        userId,
        timestamp: Date.now(),
        text: comment,
      });
    },
  }
});

function reorder<T>(list: T[], startIdx: number, endIdx: number): T[] {
  const arr = Array.from(list);
  const [removed] = arr.splice(startIdx, 1);

  arr.splice(endIdx, 0, removed);
  return arr;
}

interface HasId {
  id: string,
}

function findById<T extends HasId>(arr: T[], id: string): T | undefined {
  return arr.find((el: T) => el.id === id);
}

function findIndexById<T extends HasId>(arr: T[], id: string): number {
  return arr.findIndex((el: T) => el.id === id);
}

const { actions, reducer } = boardSlice;

export const {
  renameBoard,

  newList,
  moveList,
  updateList,
  deleteList,

  newCard,
  moveCard,
  updateCard,
  deleteCard,

  newLabel,
  deleteLabel,
  addLabel,
  removeLabel,

  newChecklist,
  moveChecklist,
  updateChecklist,
  deleteChecklist,

  newChecklistItem,
  moveChecklistItem,
  updateChecklistItem,
  deleteChecklistItem,

  newComment,
} = actions;

export default reducer;
