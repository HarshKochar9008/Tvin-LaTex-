import React, { useState } from "react";
import { Pin, PinOff, Trash2 } from "lucide-react";

export default function NotesList({ notes, onSelect, onDelete, onPin, selectedId, tab }) {
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleDelete = (e, id, title) => {
    e.stopPropagation();
    setDeleteTarget({ id, title });
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      onDelete(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  const cancelDelete = () => setDeleteTarget(null);

  const handlePin = (e, id, pinned) => {
    e.stopPropagation();
    onPin(id, !pinned);
  };

  const formatDate = dateStr => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getPreview = content => {
    const lines = content.split('\n');
    return lines.slice(0, 2).join(' ').slice(0, 100) + (content.length > 100 ? '...' : '');
  };

  return (
    <>
      <div className="w-max overflow-x-auto">
        {(notes.length > 0 || tab === 'all') && (
          <div className="flex gap-6 px-4 py-6 w-full min-h-[300px] bg-gray-800/80 rounded-2xl shadow-xl border border-gray-700">
            {notes.length === 0 && tab === 'all' && (
              <div className="text-center text-gray-400 py-16 text-lg">No notes found</div>
            )}
            {notes.map(note => (
              <div
                key={note._id}
                className={`relative flex flex-col w-[300px] p-6 rounded-3xl shadow-2xl border border-white/20 transition-all cursor-pointer bg-white/20 backdrop-blur-lg hover:bg-blue-200/10 group min-h-[200px] ${selectedId === note._id ? 'ring-2 ring-blue-400 border-blue-400' : ''}`}
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 32px)',
                }}
                onClick={() => onSelect(note)}
                tabIndex={0}
                aria-selected={selectedId === note._id}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') onSelect(note);
                }}
              >
                <div className="absolute left-0 top-6 h-6 w-1 rounded bg-blue-400/80" />
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl font-bold text-white truncate" title={note.title}>
                    {note.title}
                  </span>
                  <span className="ml-1 w-3 h-3 rounded-full bg-gray-400 inline-block" />
                </div>
                <div className="text-xs text-blue-200 mb-2">{formatDate(note.updatedAt || note.createdAt)}</div>
                <div className="text-gray-200 text-base mb-6 min-h-[48px] break-words whitespace-pre-line">
                  {getPreview(note.content)}
                </div>
                <div className="flex items-center gap-4 mt-auto">
                  <button
                    className={`text-yellow-400 ${note.pinned ? '' : 'opacity-60'} hover:opacity-100 transition-opacity p-1 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400`}
                    title={note.pinned ? 'Unpin note' : 'Pin note'}
                    tabIndex={-1}
                    onClick={e => handlePin(e, note._id, note.pinned)}
                  >
                    {note.pinned ? <Pin fill="currentColor" size={22} /> : <PinOff size={22} />}
                  </button>
                  <button
                    className="text-red-400 focus:outline-none focus:ring-2 focus:ring-red-400 rounded hover:bg-red-100/10 p-1"
                    aria-label={`Delete note ${note.title}`}
                    onClick={e => handleDelete(e, note._id, note.title)}
                    tabIndex={-1}
                  >
                    <Trash2 size={22} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {deleteTarget && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-md relative flex flex-col">
            <div className="text-white text-lg font-semibold mb-4 text-center">
              Delete note: "{deleteTarget.title}"?
            </div>
            <div className="flex justify-center gap-6 mt-2">
              <button
                className="bg-red-600 text-white px-6 py-2 rounded-lg shadow hover:bg-red-700 transition-all font-semibold text-lg"
                onClick={confirmDelete}
              >
                Delete
              </button>
              <button
                className="bg-gray-700 text-gray-200 px-6 py-2 rounded-lg shadow hover:bg-gray-600 transition-all font-semibold text-lg"
                onClick={cancelDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
