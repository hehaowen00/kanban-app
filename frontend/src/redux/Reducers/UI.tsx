import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UIState } from "../../types/Kanban";

const DefaultUIState: UIState = {
  cardId: "",
  listId: "",
  showCard: false,
  showSettings: false,
  showLabelModal: false,
  showSelectLabel: false,
};

interface ShowExistingCard {
  cardId: string,
  listId: string,
}

const uiSlice = createSlice({
  name: "UI",
  initialState: DefaultUIState,
  reducers: {
    toggleSettings: (state) => {
      state.showSettings = !state.showSettings;
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
      state.showSettings = false;
    },
    showLabelModal: (state) => {
      state.showLabelModal = true;
    },
    hideLabelModal: (state) => {
      state.showLabelModal = false;
    },
    showSelectLabelModal: (state) => {
      state.showSelectLabel = true;
    },
    hideSelectLabelModal: (state) => {
      state.showSelectLabel = false;
    },
  }
});

const { actions, reducer } = uiSlice;

export const {
  toggleSettings,
  closeCardView,
  showExistingCard,
  showLabelModal,
  hideLabelModal,
  showSelectLabelModal,
  hideSelectLabelModal,
} = actions;

export default reducer;
