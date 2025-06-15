import { createStore } from "zustand/vanilla";
import { persist, subscribeWithSelector } from "zustand/middleware";

import type { ResumeType } from "./resumeSchema";

type ResumeRecord = Record<string, ResumeType>;

type ResumeStore = {
  context: {
    data: ResumeRecord;
    current?: string;
  };
};

const store = createStore<ResumeStore>()(
  subscribeWithSelector(
    persist(
      () => ({
        context: { data: {} },
      }),
      { name: "resumes" },
    ),
  ),
);

export const getResume = (name: string): ResumeType | undefined => {
  return store.getState().context.data[name];
};

export const getResumeList = () => {
  return Object.values(store.getState().context.data);
};

export const getResumeNames = () => {
  return [...Object.keys(store.getState().context.data)];
};

export const isDuplicate = (name: string): boolean => {
  return getResume(name) !== undefined;
};

export const setCurrentResume = (name: string | undefined) => {
  const state = store.getState();
  const currentName = name || undefined;
  store.setState({ context: { ...state.context, current: currentName } });
};

export const getCurrentResumeName = () => {
  return store.getState().context.current;
};

export const addResume = (resume: ResumeType | ResumeType[]) => {
  const state = store.getState();
  const resumes = Array.isArray(resume) ? resume : [resume];
  const newData = { ...state.context.data };
  resumes.forEach((r) => (newData[r.name] = r));
  const currentName = resumes[resumes.length - 1].name;
  store.setState({ context: { current: currentName, data: newData } });
};

export const removeResume = (name: string) => {
  const state = store.getState();

  let currentName = state.context.current;
  if (name === currentName) {
    const resumes = Object.values(state.context.data);
    const idx = resumes.indexOf(state.context.data[name]);
    currentName = resumes[idx - 1]
      ? resumes[idx - 1].name
      : resumes[idx + 1]
        ? resumes[idx + 1].name
        : undefined;
  }

  const { [name]: _, ...rest } = state.context.data;
  store.setState({ context: { current: currentName, data: rest } });
};

export const subscribeResume = store.subscribe;

export const setResumeSection = (
  name: string,
  sectionName: string,
  value: ResumeType[keyof ResumeType],
) => {
  const state = store.getState();
  store.setState({
    context: {
      current: state.context.current,
      data: {
        ...state.context.data,
        [name]: {
          ...state.context.data[name],
          [sectionName]: value,
        },
      },
    },
  });
};
