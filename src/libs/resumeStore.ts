import { createStore } from "zustand/vanilla";
import { persist, subscribeWithSelector } from "zustand/middleware";

import { ResumeSchema } from "./resumeSchema";
import type { BasicInfoType, ResumeType } from "./resumeSchema";

type ResumeRecord = Record<string, ResumeType>;

type ResumeStoreState = {
  context: {
    data: ResumeRecord;
    current?: string;
  };
};

type ResumeStoreActions = {
  getResume: (name: string) => ResumeType | undefined;
  setBasicInfo: (name: string, value: BasicInfoType) => void;
  importResume: (data: object) => void;
  setCurrent: (name: string) => void;
};

type ResumeStore = ResumeStoreState & ResumeStoreActions;

export const resumeStore = createStore<ResumeStore>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        context: { data: {} },
        getResume: (name) => {
          return get().context.data[name];
        },
        setBasicInfo: (name, value) => {
          const state = get();
          const resume = state.getResume(name);
          if (!resume) {
            console.warn("no resume name: ", name);
            return;
          }
          set({
            context: {
              current: state.context.current,
              data: {
                ...state.context.data,
                [name]: {
                  ...state.context.data[name],
                  basic: value,
                },
              },
            },
          });
        },
        importResume: (data) => {
          const state = get();
          if (Array.isArray(data)) {
            // TODO
            //const resumeArr = data.map((d) => ResumeSchema.parse(d));
          } else {
            const resume = ResumeSchema.parse(data);
            if (state.getResume(resume.name)) {
              throw new Error(`简历名称重复: ${resume.name}`);
            }

            set({
              context: {
                current: state.context.current,
                data: {
                  ...state.context.data,
                  [resume.name]: resume,
                },
              },
            });
          }
        },
        setCurrent: (name) => {
          const state = get();
          const resume = state.getResume(name);
          if (!resume) {
            console.error("no resume named:", name);
            return;
          }
          if (state.context.current === name) {
            return;
          }
          set({ context: { ...state.context, current: name } });
        },
      }),
      {
        name: "resumes",
      },
    ),
  ),
);
