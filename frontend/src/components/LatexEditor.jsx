import React, { useRef } from "react";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import Toolbar from "./Toolbar";

export default function LatexEditor({ value, setValue }) {
  const textareaRef = useRef();
  const handleInsert = latex => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newValue =
      value.substring(0, start) + latex + value.substring(end);
    setValue(newValue);
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = start + latex.length;
    }, 0);
  };
  return (
    <div className="relative w-full">
      <div className="absolute top-0 left-1/3 w-96 h-48 bg-blue-700 opacity-10 rounded-full filter blur-2xl animate-pulse -z-10" style={{animationDuration: '8s'}}></div>
      <Toolbar onInsert={handleInsert} />
      <div className="flex flex-col md:flex-row gap-6 mt-4">
        <textarea
          ref={textareaRef}
          className="border border-gray-700 bg-gray-900 text-gray-100 p-4 w-full md:w-1/2 h-64 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 resize-none shadow-inner text-lg"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Type LaTeX here..."
        />
        <div className="border border-gray-700 bg-gray-800 text-white p-4 w-full md:w-1/2 h-64 rounded-lg overflow-auto shadow-inner flex items-center text-lg">
          <BlockMath math={value} errorColor="#cc0000" />
        </div>
      </div>
    </div>
  );
} 