import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => (
  <nav className="bg-gray-100 p-4 flex gap-4">
    <Link to="/login" className="font-semibold">Login</Link>
    <Link to="/diagnostic" className="font-semibold">Diagnostic</Link>
    <Link to="/profile" className="font-semibold">Profile</Link>
    <Link to="/team" className="font-semibold">Team</Link>
    <Link to="/dashboard" className="font-semibold">Dashboard</Link>
    <Link to="/admin" className="font-semibold">Admin</Link>
  </nav>
);

export default NavBar;
