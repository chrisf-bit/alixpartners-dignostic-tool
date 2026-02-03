// Centralized API utility for backend calls
export async function apiFetch(path: string, options?: RequestInit) {
  const res = await fetch(`http://localhost:3000${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
