import React from 'react';


import { useEffect, useState } from 'react';
import { apiFetch } from '../api';

const managerId = 'demo-manager-id'; // Replace with actual manager session logic

const Team: React.FC = () => {
  const [members, setMembers] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      apiFetch(`/team/members?managerId=${managerId}`),
      apiFetch(`/team/summary?managerId=${managerId}`)
    ])
      .then(([members, summary]) => {
        setMembers(members);
        setSummary(summary);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading team...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Team Dashboard</h2>
      <div className="mb-4">Completion: {summary?.completed} / {summary?.total}</div>
      <h3 className="font-semibold mb-2">Team Members</h3>
      <ul>
        {members.map(m => (
          <li key={m.id} className="mb-1">
            {m.name} ({m.email})
          </li>
        ))}
      </ul>
      {/* Skill gaps and other summary info can be added here */}
    </div>
  );
};

export default Team;
