import React, { useState } from 'react';
import { IoTrash } from 'react-icons/io5';
import { MdOutlineDone } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";

function NoteCard({ color, onDelete }) {
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(true);

  const handleSave = () => setIsEditing(false);
  const handleEdit = () => setIsEditing(true);

  return (
    <div
      className="w-52 h-52 p-4 rounded-xl shadow-md flex flex-col justify-between"
      style={{ backgroundColor: color }}
    >
      {isEditing ? (
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-full p-2 border-none outline-none resize-none placeholder-gray-500 bg-transparent"
          placeholder="Type here..."
        ></textarea>
      ) : (
        <p className="h-full overflow-auto">{content}</p>
      )}
      <div className="mt-2 flex space-x-2 justify-end">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="px-2 py-2 bg-black text-white rounded-full "
          >
            <MdOutlineDone />
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className="px-2 py-2 bg-black text-white rounded-full"
          >
            <MdModeEdit/>
          </button>
        )}
        <button
          onClick={onDelete}
          className="px-2 py-2 bg-black text-white rounded-full "
        >
          <IoTrash/>
        </button>
      </div>
    </div>
  );
}

export default NoteCard;