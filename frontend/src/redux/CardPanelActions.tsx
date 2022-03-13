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

type Action = CloseCardView
  | ShowExistingCard
  | ShowMenu;

export default Action;
