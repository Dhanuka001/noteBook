import React, { useState } from 'react';
import { IoAddSharp, IoSearch } from "react-icons/io5";
import ColorDots from './ColorDots';
import NoteCard from './NoteCard';

function Home() {
  const [showDots, setShowDots] = useState(false);
  const [notes, setNotes] = useState([]);

  const handleAddClick = () => setShowDots(!showDots);

  const handleColorSelect = (color) => {
    const newNote = { id: Date.now(), color };
    setNotes([...notes, newNote]);
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="flex h-screen">
      {/* Left Column */}
      <div className="w-[180px] bg-white border-r-2 flex flex-col items-center">
        <h1 className="text-2xl font-mono py-5">Docket</h1>
        <button 
          className="px-3 py-3 bg-black text-white rounded-full mt-8"
          onClick={handleAddClick}
        >
          <IoAddSharp className="text-2xl font-semibold" />
        </button>
        {showDots && <ColorDots onSelectColor={handleColorSelect} />}
      </div>

      {/* Right Column */}
      <div className="w-10/12 bg-white px-20 py-6">
        <div className="flex items-center gap-2">
          <IoSearch className="text-gray-400 text-xl" />
          <input 
            className="border-none focus:outline-none placeholder-gray-400 text-lg" 
            type="text" 
            placeholder="Search" 
          />
        </div>

        <h1 className="mt-10 text-4xl font-mono font-semibold mb-4">Notes</h1>
        
        {/* Cards Container */}
        <div 
          id="notes-container" 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8"
        >
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              color={note.color}
              onDelete={() => handleDeleteNote(note.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
