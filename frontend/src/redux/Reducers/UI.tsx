import UIAction from "../CardPanelActions";
import { CardViewState as UIState } from "../../Types/Kanban";

const DefaultUIState = {
  cardId: "",
  listId: "",
  showCard: false,
  showMenu: false,
  showLabelModal: false,
};

function UIReducer(state: UIState = DefaultUIState, action: UIAction) {
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
    case "ShowLabelModal": {
      return { ...state, showLabelModal: true, };
    }
    case "HideLabelModal": {
      return {
        ...state,
        showLabelModal: false
      };
    }
    default:
      return state;
  }
}

export default UIReducer;