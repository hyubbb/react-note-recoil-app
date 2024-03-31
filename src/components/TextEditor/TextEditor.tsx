import React, { useEffect, useMemo, useRef, useState } from "react";
import { Container } from "./TextEditor.styles";

import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize";

import { imageToServer } from "../../server/api";
Quill.register("modules/ImageResize", ImageResize);

interface textEditorProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  color: string;
  uploadedImages: string[];
  setUploadedImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const TextEditor = ({
  color,
  value,
  setValue,
  uploadedImages,
  setUploadedImages,
}: textEditorProps) => {
  const quillRef = useRef<ReactQuill>(null); // Quill 인스턴스를 참조하기 위한 ref

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input && input.files ? input.files[0] : null;
      const imageUrl = await imageToServer.create(file);
      const q = quillRef.current;
      const editor = q?.getEditor();
      const range = editor?.getSelection();
      if (editor && range) {
        editor.insertEmbed(range.index, "image", imageUrl);
        setUploadedImages((prevImages) => [...prevImages, imageUrl]);
      }
    };
  };

  // 수정했을때 이미지 삭제,
  // 수정하기전에 value값에서 이미지의 length를 구해서, 저장할때의 이미지의 length와 비교해서
  // 더 많으면 삭제, 수정전에 이미지의 경로를 저장해놓고, 수정후에 이미지의 경로를 저장해서 비교해서
  // 없는 이미지를 삭제

  useEffect(() => {
    const handleBeforeUnload = async () => {
      // 업로드된 이미지 목록을 서버에서 삭제
      uploadedImages.forEach((imageUrl) => {
        imageToServer.delete(imageUrl);
      });
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [uploadedImages]);

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

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ list: "ordered" }, { list: "bullet" }],
          [],
          ["italic", "underline", "strike"],
          [],
          [{ color: [] }, { background: [] }],
          [],
          ["image", "blockquote", "code-block"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      ImageResize: {
        parchment: Quill.import("parchment"),
        modules: ["Resize", "DisplaySize"],
      },
    };
  }, []);

  return (
    <>
      <Container $noteColor={color}>
        <ReactQuill
          ref={quillRef}
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
