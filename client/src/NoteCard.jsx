import React, { useState } from 'react';
import { IoTrash } from 'react-icons/io5';
import { MdOutlineDone } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

function NoteCard({color, onDelete,content: initialContent }) {
  
  const [content, setContent] = useState(initialContent || '');
  const [isEditing, setIsEditing] = useState(true);
  const [favorite, setFavorite] = useState(false);

  const handleSave = () => setIsEditing(false);
  const handleEdit = () => setIsEditing(true);

  const toggleFavorite = () => setFavorite(!favorite);

  return (
    <div
      className="relative w-52 h-52 p-4 rounded-xl shadow-md flex flex-col justify-between"
      style={{ backgroundColor: color }}
    >
       {/* Favorite Button */}
       <button
        onClick={toggleFavorite}
        className="absolute top-2 right-2 text-xl"
      >
        {favorite ? (
          <AiFillStar className="text-yellow-500" />
        ) : (
          <AiOutlineStar className="text-gray-400" />
        )}
      </button>

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
            className="px-1 py-1 bg-black text-white rounded-full "
          >
            <MdOutlineDone />
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className="px-1 py-1 bg-black text-white rounded-full"
          >
            <MdModeEdit/>
          </button>
        )}
        <button
          onClick={onDelete}
          className="px-1 py-1 bg-black text-white rounded-full "
        >
          <IoTrash/>
        </button>
      </div>
    </div>
  );
}

export default NoteCard;