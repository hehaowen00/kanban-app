import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UIState } from "../../types/Kanban";

const DefaultUIState: UIState = {
  cardId: "",
  listId: "",
  showCard: false,
  showSettings: false,
  showLabelModal: false,
};

// function UIReducer(state: UIState = DefaultUIState, action: UIAction) {
//   switch (action.type) {
//     case "CloseCardView": {
//       return {
//         ...state,
//         cardId: "",
//         listId: "",
//         showCard: false,
//       }
//     }
//     case "ShowExistingCard": {
//       const { cardId, listId, } = action;
//       return {
//         ...state,
//         cardId,
//         listId,
//         showCard: true,
//       };
//     }
//     case "ShowMenu": {
//       return {
//         ...state,
//         showMenu: !state.showMenu,
//       };
//     }
//     case "ShowLabelModal": {
//       return { ...state, showLabelModal: true, };
//     }
//     case "HideLabelModal": {
//       return {
//         ...state,
//         showLabelModal: false
//       };
//     }
//     default:
//       return state;
//   }
// }

// function testReducer(state: CardViewState = DefaultUIState, action: UIAction) {
//   switch (action.type) {
//     default:
//       return state;
//   }
// }

// export const closeCardView = createAction("ui/closeCardView");
// export const showExistingCard = createAction<{ cardId: string, listId: string }>("ui/showExistingCard");
// export const toggleMenu = createAction("ui/toggleMenu");
// export const showLabelModal = createAction("ui/showLabelModal");
// export const hideLabelModal = createAction("ui/hideLabelModal");

// const uiReducer = createReducer(DefaultUIState, {
//   [closeCardView.type]: (state, action) => {
//     state.showCard = false;
//     state.cardId = "";
//     state.listId = "";
//     return state;
//   },
//   [showExistingCard.type]: (state, action) => {
//     const { cardId, listId } = action.payload;
//     state.cardId = cardId;
//     state.listId = listId;
//     return state;
//   },
//   [toggleMenu.type]: (state, action) => {
//     state.showSettings = !state.showSettings
//     return state;
//   },
//   [showLabelModal.type]: (state, action) => {
//     state.showLabelModal = true;
//     return state;
//   },
//   [hideLabelModal.type]: (state, action) => {
//     state.showLabelModal = false;
//     return state;
//   }
// });

interface ShowExistingCard {
  cardId: string,
  listId: string,
}

const uiSlice = createSlice({
  name: "UI",
  initialState: DefaultUIState,
  reducers: {
    toggleSettings: (state) => {
      state.showSettings = !state.showSettings
    },
    closeCardView: (state) => {
      state.showCard = false;
      state.cardId = "";
      state.listId = "";
    },
    showExistingCard: (state, action: PayloadAction<ShowExistingCard>) => {
      const { cardId, listId } = action.payload;
      state.cardId = cardId;
      state.listId = listId;
    },
    showLabelModal: (state) => {
      state.showLabelModal = true;
    },
    hideLabelModal: (state) => {
      state.showLabelModal = false;
    }
  }
});

const { actions, reducer } = uiSlice;

export const {
  toggleSettings,
  closeCardView,
  showExistingCard,
  showLabelModal,
  hideLabelModal
} = actions;

export default reducer;
