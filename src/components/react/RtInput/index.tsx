import { DateEditor, TextAreaEditor, TextEditor } from "./editor";
import { TextRenderer } from "./renderer";
import type { EditorProps, EditorType, Props } from "./types";

export default function RtInput<T extends EditorType>(props: Props<T>) {
  const { editorType = "text", rendererType = "text" } = props;
  if (props.editing) {
    props.editorProps.value = props.value;
    switch (editorType) {
      case "text":
        return <TextEditor {...(props.editorProps as EditorProps<"text">)} />;
      case "textarea":
        return (
          <TextAreaEditor {...(props.editorProps as EditorProps<"textarea">)} />
        );
      case "date":
        return <DateEditor {...(props.editorProps as EditorProps<"date">)} />;
      default:
        throw new Error(`invalid editor type: ${props.editorType}`);
    }
  } else {
    if (!props.value) {
      console.error("value not be null when render: ", props.value);
      return undefined;
    }
    switch (rendererType) {
      case "text":
        return <TextRenderer {...props.rendererProps} value={props.value} />;
      default:
        throw new Error(`invalid renderer type: ${props.rendererProps}`);
    }
  }
}
