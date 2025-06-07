export type UpdaterProps<T> = {
  data: T;
  onUpdate: (data: T) => void;
};

export type ItemUpdaterProps<T> = {
  index: number;
  list: T[];
  onUpdate: (list: T[]) => void;
};
