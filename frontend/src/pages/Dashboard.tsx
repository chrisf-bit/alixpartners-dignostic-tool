import React from 'react';


import { useEffect, useState } from 'react';
import { apiFetch } from '../api';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [distribution, setDistribution] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      apiFetch('/dashboard/organisation'),
      apiFetch('/dashboard/competency-distribution')
    ])
      .then(([stats, distribution]) => {
        setStats(stats);
        setDistribution(distribution);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Organisation Dashboard</h2>
      <div className="mb-4">Total Users: {stats?.totalUsers}</div>
      <div className="mb-4">Completed Diagnostics: {stats?.completed}</div>
      <h3 className="font-semibold mb-2">Competency Distribution</h3>
      <ul>
        {distribution && Object.entries(distribution).map(([comp, levels]: any) => (
          <li key={comp} className="mb-1">
            <span className="font-bold">{comp}</span>: Strength {levels.Strength}, Developing {levels.Developing}, Focus Area {levels['Focus Area']}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
