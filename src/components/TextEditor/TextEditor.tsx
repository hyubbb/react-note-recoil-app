import React, { useMemo } from "react";
import { Container } from "./TextEditor.styles";
import "react-quill/dist/quill.snow.css";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize";
Quill.register("modules/ImageResize", ImageResize);

interface textEditorProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  color: string;
}

const TextEditor = ({ color, value, setValue }: textEditorProps) => {
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

  // const imageHandler = () => {};

  const modules = useMemo(() => {
    return {
      toolbar: [
        [{ list: "ordered" }, { list: "bullet" }],
        [],
        ["italic", "underline", "strike"],
        [],
        [{ color: [] }, { background: [] }],
        [],
        ["image", "blockquote", "code-block"],
      ],
      ImageResize: {
        parchment: Quill.import("parchment"),
      },
    };
  }, []);

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
