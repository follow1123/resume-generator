import type {
  ReactNode,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  HTMLAttributes,
} from "react";

export type CustomEditorProps = {
  onConfirm: (v: string) => void;
};

export type EditorProps<T> = T extends "text"
  ? InputHTMLAttributes<HTMLInputElement> & CustomEditorProps
  : T extends "textarea"
    ? TextareaHTMLAttributes<HTMLTextAreaElement> & CustomEditorProps
    : T extends "date"
      ? InputHTMLAttributes<HTMLInputElement> & CustomEditorProps
      : never;

export interface Editor<T> {
  (props: EditorProps<T>): ReactNode;
}

export type RendererProps = HTMLAttributes<HTMLSpanElement>;

export interface Renderer {
  (props: RendererProps & { value: string }): ReactNode;
}

export type EditorType = "text" | "textarea" | "date";

export type RendererType = "text" | "markdown";

export interface Props<T extends EditorType> {
  editorProps: EditorProps<T>;
  rendererProps?: RendererProps;
  editorType?: T;
  rendererType?: RendererType;
  value?: string;
  editing: boolean;
}
