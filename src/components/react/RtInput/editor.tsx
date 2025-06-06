import type { Editor } from "./types";

export const TextEditor: Editor<"text"> = (props) => {
  const {
    onBlur: _1,
    onKeyDown: _2,
    defaultValue: _3,
    autoFocus: _4,
    type: _5,
    value,
    onConfirm,
    ...rest
  } = props;
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
};

export const TextAreaEditor: Editor<"textarea"> = (props) => {
  const {
    onBlur: _1,
    defaultValue: _2,
    autoFocus: _3,
    value,
    onConfirm,
    ...rest
  } = props;

  return (
    <textarea
      onBlur={(e) => onConfirm(e.target.value)}
      defaultValue={value}
      autoFocus
      {...rest}
    />
  );
};

export const DateEditor: Editor<"date"> = (props) => {
  const {
    onBlur: _1,
    onKeyDown: _2,
    defaultValue: _3,
    autoFocus: _4,
    type: _5,
    value,
    onConfirm,
    ...rest
  } = props;
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
};
