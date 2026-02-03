import React from 'react';


import { useEffect, useState } from 'react';
import { apiFetch } from '../api';

type Stats = {
  totalUsers?: number;
  completed?: number;
};

type CompetencyLevels = {
  Strength?: number;
  Developing?: number;
  'Focus Area'?: number;
};

type Distribution = Record<string, CompetencyLevels> | null;

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [distribution, setDistribution] = useState<Distribution>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      apiFetch('/dashboard/organisation'),
      apiFetch('/dashboard/competency-distribution')
    ])
      .then(([s, d]) => {
        setStats(s);
        setDistribution(d);
      })
      .catch((e: unknown) => {
        if (e instanceof Error) setError(e.message);
        else setError(String(e));
      })
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
        {distribution && Object.entries(distribution).map(([comp, levels]: [string, CompetencyLevels]) => (
          <li key={comp} className="mb-1">
            <span className="font-bold">{comp}</span>: Strength {levels.Strength}, Developing {levels.Developing}, Focus Area {levels['Focus Area']}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
