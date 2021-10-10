export type AddList = {
  type: "AddList",
  name: string,
};

export type DeleteList = {
  type: "DeleteList",
  id: string
};

export type MoveList = {
  type: "MoveList",
  id: string,
  src: number,
  dest: number
};

export type RenameList = {
  type: "RenameList",
  id: string,
  name: string
};

