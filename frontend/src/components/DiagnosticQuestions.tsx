import React from 'react';
import { useQuestions } from '../hooks/useQuestions';

const DiagnosticQuestions: React.FC = () => {
  const { questions, loading, error } = useQuestions();

  if (loading) return <div>Loading questions...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h3 className="font-bold mb-2">Knowledge Questions</h3>
      <ul className="space-y-4">
        {questions.map(q => (
          <li key={q.id} className="border p-4 rounded">
            <div className="font-semibold">{q.section}: {q.question}</div>
            {q.type === 'multiple-choice' ? (
              <div className="flex gap-2 mt-2">
                {q.options.map((opt: string) => (
                  <button key={opt} className="border px-2 py-1 rounded">{opt}</button>
                ))}
              </div>
            ) : (
              <input type="text" className="border p-2 rounded mt-2" placeholder="Your answer" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiagnosticQuestions;
