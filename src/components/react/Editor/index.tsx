import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  onConfirm: (v: string) => void;
}

export function TextEditor({
  onBlur: _1,
  onKeyDown: _2,
  defaultValue: _3,
  autoFocus: _4,
  type: _5,
  value,
  onConfirm,
  ...rest
}: InputProps) {
  return (
    <input
      type="text"
      onBlur={(e) => onConfirm(e.target.value)}
      onKeyDown={(e) =>
        e.key === "Enter" && onConfirm((e.target as HTMLInputElement).value)
      }
      defaultValue={value}
      autoFocus
      {...rest}
    />
  );
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  value?: string;
  onConfirm: (v: string) => void;
}

export function TextAreaEditor({
  onBlur: _1,
  defaultValue: _2,
  autoFocus: _3,
  value,
  onConfirm,
  ...rest
}: TextareaProps) {
  return (
    <textarea
      onBlur={(e) => onConfirm(e.target.value)}
      defaultValue={value}
      autoFocus
      {...rest}
    />
  );
}

export function DateEditor({
  onBlur: _1,
  onKeyDown: _2,
  defaultValue: _3,
  autoFocus: _4,
  type: _5,
  value,
  onConfirm,
  ...rest
}: InputProps) {
  return (
    <input
      type="date"
      onBlur={(e) => onConfirm(e.target.value)}
      onChange={(e) => onConfirm(e.target.value)}
      defaultValue={value}
      autoFocus
      {...rest}
    />
  );
}
