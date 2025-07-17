import React from "react";
import LatexEditor from "./LatexEditor";

export default function NoteEditorModal({
  open,
  onClose,
  title,
  setTitle,
  content,
  setContent,
  onSave,
  error,
  isUpdate
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-3xl shadow-2xl p-10 w-full max-w-3xl min-h-[520px] relative flex flex-col">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-red-400 text-2xl font-bold"
          onClick={onClose}
          aria-label="Close editor"
        >
          ×
        </button>
        <input
          className="border border-gray-700 bg-gray-900 text-gray-100 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 shadow-inner mb-4 text-lg font-semibold"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          aria-label="Note title"
        />
        <div className="flex-1 flex flex-col">
          <LatexEditor value={content} setValue={setContent} />
        </div>
        {error && (
          <div className="mb-2 mt-4 text-red-400 font-semibold text-center">{error}</div>
        )}
        <div className="flex justify-end gap-4 mt-6">
          <button
            className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow hover:bg-blue-700 transition-all font-semibold text-lg"
            onClick={onSave}
            disabled={!title || !content}
          >
            {isUpdate ? "Update" : "Create"}
          </button>
          <button
            className="bg-gray-700 text-gray-200 px-8 py-3 rounded-lg shadow hover:bg-gray-600 transition-all font-semibold text-lg"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
} 