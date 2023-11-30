import React from "react";
import { Container } from "./TextEditor.styles";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

interface textEditorProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  color: string;
}

const formats = [
  "bold",
  "italic",
  "underline",
  "strike",
  "list",

  "color",
  "background",

  "image",
  "blockquote",
  "code-block",
];

const modules = {
  toolbar: [
    [{ list: "ordered" }, { list: "bullet" }],
    [],
    ["italic", "underline", "strike"],
    [],
    [{ color: [] }, { background: [] }],
    [],
    ["image", "blockquote", "code-block"],
  ],
};

const TextEditor = ({ color, value, setValue }: textEditorProps) => {
  return (
    <>
      <Container $noteColor={color}>
        <ReactQuill
          theme='snow'
          value={value}
          onChange={(value) => setValue(value)}
          placeholder='Write notes...'
          formats={formats}
          modules={modules}
        />
      </Container>
    </>
  );
};

export default TextEditor;
