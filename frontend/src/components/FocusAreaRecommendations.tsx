import React, { useEffect, useState } from 'react';
import { apiFetch } from '../api';

interface Props {
  focusAreas: { competency: string }[];
}

const FocusAreaRecommendations: React.FC<Props> = ({ focusAreas }) => {
  const [recs, setRecs] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    Promise.all(
      focusAreas.map(fa =>
        apiFetch(`/recommendations/${fa.competency}`).then(r => ({ key: fa.competency, recs: r }))
      )
    ).then(results => {
      const out: { [key: string]: string[] } = {};
      results.forEach(({ key, recs }) => { out[key] = recs; });
      setRecs(out);
    });
  }, [focusAreas]);

  return (
    <div className="mt-4">
      <h3 className="font-semibold mb-2">Recommendations</h3>
      <ul>
        {Object.entries(recs).map(([comp, recs]) => (
          <li key={comp} className="mb-2">
            <span className="font-bold">{comp}</span>: {recs.join('; ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FocusAreaRecommendations;
