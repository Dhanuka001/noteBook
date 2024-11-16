import React, { useState } from 'react';

const colors = ['#f7e380', '#ffb066', '#d296ff', '#96dcff', '#cfff96', '#e3e2e2'];

function ColorDots({ onSelectColor }) {
  return (
    <div className="flex-col space-y-4 mt-12">
      {colors.map((color, index) => (
        <div
          key={color}
          className={`w-6 h-6 rounded-full cursor-pointer opacity-0 animate-fade-in`}
          style={{ backgroundColor: color,
            animationDelay: `${index * 200}ms`,
           }}
          onClick={() => onSelectColor(color)}
        ></div>
      ))}
    </div>
  );
}

export default ColorDots;
