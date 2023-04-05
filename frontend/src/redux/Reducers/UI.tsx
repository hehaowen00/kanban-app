import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UIState } from "../../types/Kanban";

const DefaultUIState: UIState = {
  cardId: "",
  listId: "",
  showCard: false,
  showSettings: false,
  showAddLabel: false,
  showSelectLabel: false,
  showEditLabel: false,
  editLabel: "",
  history: undefined,
};

interface ShowExistingCard {
  cardId: string,
  listId: string,
}

interface ShowEditLabel {
  labelId: string,
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
      state.showAddLabel = true;
    },
    hideLabelModal: (state) => {
      state.showAddLabel = false;
    },
    showSelectLabelModal: (state) => {
      state.showSelectLabel = true;
    },
    hideSelectLabelModal: (state) => {
      state.showSelectLabel = false;
    },
    showEditLabelModal: (state, action: PayloadAction<ShowEditLabel>) => {
      state.showEditLabel = true;
      state.editLabel = action.payload.labelId;
      if (state.showAddLabel) {
        state.showAddLabel = false;
      }
      if (state.showSelectLabel) {
        state.showSelectLabel = false;
        state.history = {
          showSelectLabel: true,
        };
      }
    },
    closeEditLabelModal: (state) => {
      state.showEditLabel = false;
      Object.assign(state, state.history);
    }
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
  showEditLabelModal,
  closeEditLabelModal,
} = actions;

export default reducer;
