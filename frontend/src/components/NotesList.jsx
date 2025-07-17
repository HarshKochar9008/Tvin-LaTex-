import React, { useState } from "react";
import { Pin, PinOff, Trash2 } from "lucide-react";

export default function NotesList({ notes, onSelect, onDelete, onPin, selectedId }) {
  const [search, setSearch] = useState("");
  // Confirm before delete
  const handleDelete = (e, id, title) => {
    e.stopPropagation();
    if (window.confirm(`Delete note: "${title}"? This cannot be undone.`)) {
      onDelete(id);
    }
  };
  // Pin/unpin note
  const handlePin = (e, id, pinned) => {
    e.stopPropagation();
    onPin(id, !pinned);
  };
  // Filter notes by search
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );
  const pinnedNotes = filteredNotes.filter(n => n.pinned);
  const otherNotes = filteredNotes.filter(n => !n.pinned);
  return (
    <div className="relative w-full max-w-xs min-w-[260px] h-[80vh] mx-4 my-6 p-5 rounded-3xl shadow-2xl border border-white/20 bg-white/10 backdrop-blur-lg flex flex-col overflow-y-auto glassmorphism-sidebar">
      {/* Blurred animated background */}
      <div className="absolute top-0 left-0 w-60 h-60 bg-blue-700 opacity-20 rounded-full filter blur-2xl animate-pulse -z-10" style={{animationDuration: '7s'}}></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-purple-700 opacity-20 rounded-full filter blur-2xl animate-pulse -z-10" style={{animationDuration: '9s'}}></div>
      <h2 className="font-bold text-white text-lg mb-4 tracking-wide drop-shadow">Notes</h2>
      <input
        className="mb-4 px-4 py-2 rounded-xl bg-white/20 text-gray-100 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-300 shadow-inner backdrop-blur-md"
        placeholder="Search notes..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        aria-label="Search notes"
      />
      {/* Important section */}
      {pinnedNotes.length > 0 && (
        <>
          <div className="text-yellow-300 font-semibold mb-1 mt-2">Important</div>
          <ul className="space-y-3 mb-4" tabIndex={0} aria-label="Important notes">
            {pinnedNotes.map((note, idx) => (
              <li
                key={note._id}
                className={`relative flex justify-between items-center p-4 rounded-2xl cursor-pointer transition-all border shadow-lg group glassmorphism-card
                  ${selectedId === note._id
                    ? "bg-blue-400/30 border-blue-400 ring-2 ring-blue-300 shadow-xl"
                    : "bg-yellow-200/10 border-white/10 hover:bg-blue-400/20 hover:border-blue-300 hover:shadow-xl"}
                `}
                onClick={() => onSelect(note)}
                tabIndex={0}
                aria-selected={selectedId === note._id}
                onKeyDown={e => {
                  if (e.key === "Enter" || e.key === " ") onSelect(note);
                }}
              >
                {/* Blurred background */}
                <div className="absolute inset-0 w-full h-full bg-yellow-100/10 blur-xl rounded-2xl -z-10 pointer-events-none" />
                {/* Left dash */}
                <div className="absolute left-0 top-6 h-6 w-1 rounded bg-yellow-400/80" />
                <span className="truncate text-white font-medium ml-3" title={note.title}>{note.title}</span>
                <div className="flex items-center gap-1 ml-auto">
                  <button
                    className="text-yellow-400 opacity-100 transition-opacity p-1 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    title="Unpin note"
                    tabIndex={-1}
                    onClick={e => handlePin(e, note._id, note.pinned)}
                  >
                    <Pin fill="currentColor" size={18} />
                  </button>
                  <button
                    className="text-red-400 ml-2 focus:outline-none focus:ring-2 focus:ring-red-400 rounded hover:bg-red-900/30 p-1"
                    aria-label={`Delete note ${note.title}`}
                    onClick={e => handleDelete(e, note._id, note.title)}
                    tabIndex={-1}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
      {/* Other notes */}
      <ul className="space-y-3" tabIndex={0} aria-label="Notes">
        {otherNotes.length === 0 && filteredNotes.length === 0 && (
          <li className="text-gray-400 text-sm text-center py-8">No notes found</li>
        )}
        {otherNotes.map((note, idx) => (
          <li
            key={note._id}
            className={`relative flex justify-between items-center p-4 rounded-2xl cursor-pointer transition-all border shadow-lg group glassmorphism-card
              ${selectedId === note._id
                ? "bg-blue-400/30 border-blue-400 ring-2 ring-blue-300 shadow-xl"
                : "bg-white/10 border-white/10 hover:bg-blue-400/20 hover:border-blue-300 hover:shadow-xl"}
            `}
            onClick={() => onSelect(note)}
            tabIndex={0}
            aria-selected={selectedId === note._id}
            onKeyDown={e => {
              if (e.key === "Enter" || e.key === " ") onSelect(note);
            }}
          >
            {/* Blurred background */}
            <div className="absolute inset-0 w-full h-full bg-blue-100/10 blur-xl rounded-2xl -z-10 pointer-events-none" />
            {/* Left dash */}
            <div className="absolute left-0 top-6 h-6 w-1 rounded bg-blue-400/80" />
            <span className="truncate text-white font-medium ml-3" title={note.title}>{note.title}</span>
            <div className="flex items-center gap-1 ml-auto">
              <button
                className="text-yellow-400 opacity-0 group-hover:opacity-80 transition-opacity p-1 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                title="Pin note"
                tabIndex={-1}
                onClick={e => handlePin(e, note._id, note.pinned)}
              >
                {note.pinned ? <Pin fill="currentColor" size={18} /> : <PinOff size={18} />}
              </button>
              <button
                className="text-red-400 ml-2 focus:outline-none focus:ring-2 focus:ring-red-400 rounded hover:bg-red-900/30 p-1"
                aria-label={`Delete note ${note.title}`}
                onClick={e => handleDelete(e, note._id, note.title)}
                tabIndex={-1}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </li>
        ))}
      </ul>
      {/* Custom scrollbar styles */}
      <style>{`
        .glassmorphism-sidebar::-webkit-scrollbar {
          width: 8px;
        }
        .glassmorphism-sidebar::-webkit-scrollbar-thumb {
          background: rgba(180, 200, 255, 0.18);
          border-radius: 8px;
        }
        .glassmorphism-sidebar::-webkit-scrollbar-track {
          background: transparent;
        }
        .glassmorphism-card {
          backdrop-filter: blur(8px) saturate(120%);
          -webkit-backdrop-filter: blur(8px) saturate(120%);
        }
      `}</style>
    </div>
  );
} 