"use client";

import ReactQuill from "react-quill-new";
import React, { ComponentProps } from "react";
import "react-quill-new/dist/quill.snow.css";

interface TextEditorProps extends ComponentProps<typeof ReactQuill> {
  label?: string;
  errorMessage?: string;
}

const TextEditor = (props: TextEditorProps) => {
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
    ],
  };

  const formats = ["bold", "italic", "underline", "strike", "list", "link"];

  return (
    <div className="w-full h-full flex flex-col">
      {props.label && <p className="text-sm">{props.label}</p>}
      <ReactQuill
        className="mt-1 flex-grow"
        defaultValue=""
        formats={formats}
        modules={modules}
        placeholder="Write your content..."
        theme="snow"
        {...props}
      />
      {props.errorMessage && (
        <p className=" text-red-500 mt-1 text-xs">{props.errorMessage}</p>
      )}
    </div>
  );
};

export default TextEditor;
