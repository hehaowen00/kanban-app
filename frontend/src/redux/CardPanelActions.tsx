type CloseCardView = {
  type: "CloseCardView",
};

type ShowExistingCard = {
  type: "ShowExistingCard",
  cardId: string,
  listId: string,
};

type Action = CloseCardView
  | ShowExistingCard;

export default Action;
