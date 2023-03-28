type CloseCardView = {
  type: "CloseCardView",
};

type ShowExistingCard = {
  type: "ShowExistingCard",
  cardId: string,
  listId: string,
};

type ShowMenu = {
  type: "ShowMenu",
};

type ShowLabelModal = {
  type: "ShowLabelModal",
  payload: {}
};

type HideLabelModal = {
  type: "HideLabelModal",
};

type Action = CloseCardView
  | ShowExistingCard
  | ShowMenu
  | ShowLabelModal
  | HideLabelModal;

export default Action;
