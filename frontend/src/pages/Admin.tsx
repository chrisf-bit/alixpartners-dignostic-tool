import React from 'react';


import { useEffect, useState } from 'react';
import { apiFetch } from '../api';

const Admin: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch('/admin/users')
      .then(setUsers)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const handleExport = () => {
    window.open('http://localhost:3000/admin/export', '_blank');
  };

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
      <button onClick={handleExport} className="bg-green-600 text-white py-2 px-4 rounded mb-4">Export CSV</button>
      <h3 className="font-semibold mb-2">All Users</h3>
      <ul>
        {users.map(u => (
          <li key={u.id} className="mb-1">
            {u.name} ({u.email}) - {u.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
