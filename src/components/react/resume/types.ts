export type UpdaterProps<T> = {
  data: T;
  onUpdate: (data: T) => void;
};
