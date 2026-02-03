import React from 'react';



import { useEffect, useState } from 'react';
import { apiFetch } from '../api';
import CompetencyBar from '../components/CompetencyBar';
import FocusAreaRecommendations from '../components/FocusAreaRecommendations';

const userId = 'demo-user-id'; // Replace with actual user session logic

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch(`/profile/me?userId=${userId}`)
      .then(setProfile)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>No profile found.</div>;

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Your Skills Profile</h2>
      <button
        className="bg-green-600 text-white py-2 px-4 rounded mb-4"
        onClick={() => alert('PDF download not yet implemented')}
      >
        Download PDF Report
      </button>
      <div className="mb-4">Name: {profile.name}</div>
      <div className="mb-4">Email: {profile.email}</div>
      <h3 className="font-semibold mb-2">Competencies</h3>
      <div>
        {profile.competencies && Object.entries(profile.competencies).map(([key, value]: any) => (
          <CompetencyBar key={key} label={key} score={value.score} level={value.level} />
        ))}
      </div>
      <h3 className="font-semibold mt-4 mb-2">Strengths</h3>
      <ul>
        {profile.strengths && profile.strengths.map((s: string) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      <h3 className="font-semibold mt-4 mb-2">Focus Areas</h3>
      <ul>
        {profile.focus_areas && profile.focus_areas.map((fa: any) => (
          <li key={fa.competency}>
            <span className="font-bold">{fa.competency}</span>: {fa.recommendation}
          </li>
        ))}
      </ul>
      {profile.focus_areas && <FocusAreaRecommendations focusAreas={profile.focus_areas} />}
    </div>
  );
};

export default Profile;
