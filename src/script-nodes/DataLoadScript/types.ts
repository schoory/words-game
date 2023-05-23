export type LevelDataWordCell = { x: number; y: number };

export type LevelDataWord = {
  word: string;
  image: string;
  cells: LevelDataWordCell[];
};

export type LevelDataItem = {
  backgroundImage: string;
  headerTitleText: string;
  headerDescriptionText: string;
  taskText: string;
  words: LevelDataWord[];
};

export type LevelData = {
  items: LevelDataItem[];
};
