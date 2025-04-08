// src/components/Navbar.jsx
import React from 'react';

const Navbar = () => {
  return (
    <nav className="w-full bg-sky-300 p-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold text-white">🚍 College Bus Monitoring</h1>
      <div className="space-x-4">
        <a href="/" className="text-black hover:underline">Dashboard</a>
        <a href="/track" className="text-black hover:underline">Track Bus</a>
        <a href="/checkin" className="text-black hover:underline">Check-In</a>
        <a href="/alerts" className="text-black hover:underline">Notifications</a>
        <a href="/admin" className="text-black hover:underline">Admin</a>
      </div>
    </nav>
  );
};

export default Navbar;
