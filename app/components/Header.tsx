// app/components/Header.js
import React from 'react';
import { Menu, Grid } from 'lucide-react'; // Assuming you install lucide-react for icons

export default function Header() {
  return (
    <header className="sticky top-0 bg-white shadow-sm p-4 flex items-center justify-between z-10">
      {/* Menu Icon (Left) */}
      <button className="text-gray-700">
        <Menu size={24} />
      </button>

      {/* Title */}
      <h1 className="text-xl font-bold text-[#6A0DAD]">
        To Do List
      </h1>

      {/* Grid Icon (Right) */}
      <button className="text-gray-700">
        <Grid size={24} />
      </button>
    </header>
  );
}
// 3. DO NOT include any other export lines or code below this.