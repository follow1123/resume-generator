import z, { ZodError } from "zod/v4";

type ClassName = string | undefined;

export const classList = (...classNames: ClassName[]): string => {
  return classNames.filter((c) => c).join(" ");
};

export const randomName = (prefix: string): string => {
  return `${prefix}-${Math.floor(Math.random() * 999) + 1}`;
};

export const zodPrettifyError = (e: unknown): string | undefined => {
  return e instanceof ZodError ? z.prettifyError(e) : undefined;
};
