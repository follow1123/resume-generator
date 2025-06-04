import { createStore } from "zustand/vanilla";

type MessageLevel = "info" | "warn" | "error";

export interface Message {
  level: MessageLevel;
  message: string;
}

interface MessageStore {
  messages: Message[];
  produce(message: Message): void;
  consume(): Message | undefined;
}

const messageStore = createStore<MessageStore>()((set, get) => ({
  messages: [],
  produce: (message) => {
    set((state) => {
      state.messages.push(message);
      return { messages: [...state.messages] };
    });
  },
  consume: () => get().messages.shift(),
}));

interface NotificationHandler {
  (message: Message): void;
}

export const notify = (
  message: Message["message"],
  level?: Message["level"],
) => {
  messageStore.getState().produce({
    message,
    level: level || "info",
  });
};

export const subscribe = (handler: NotificationHandler): (() => void) => {
  return messageStore.subscribe((state) => {
    const message = state.consume();
    if (message) {
      handler(message);
    }
  });
};
