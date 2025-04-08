// src/components/Sidebar.jsx
import React from 'react';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-100 h-screen p-4">
      <h2 className="text-lg font-bold mb-4">Menu</h2>
      <ul className="space-y-3">
        <li><a href="/" className="block p-2 rounded hover:bg-gray-200">Dashboard</a></li>
        <li><a href="/track" className="block p-2 rounded hover:bg-gray-200">Track Bus</a></li>
        <li><a href="/checkin" className="block p-2 rounded hover:bg-gray-200">Student Check-In</a></li>
        <li><a href="/alerts" className="block p-2 rounded hover:bg-gray-200">Notifications</a></li>
        <li><a href="/admin" className="block p-2 rounded hover:bg-gray-200">Admin Panel</a></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
