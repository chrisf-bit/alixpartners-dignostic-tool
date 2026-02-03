import { useEffect, useState } from 'react';
import { apiFetch } from '../api';

type Question = {
  id: string;
  question: string;
  section?: string;
  type?: 'multiple-choice' | 'text';
  competency?: string;
  options?: string[];
};

export function useQuestions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch('/diagnostic/questions')
      .then(setQuestions)
      .catch((e: unknown) => {
        if (e instanceof Error) setError(e.message);
        else setError(String(e));
      })
      .finally(() => setLoading(false));
  }, []);

  return { questions, loading, error };
} 
