const API_URL = import.meta.env.VITE_API_URL;

async function get(path) {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) throw new Error("Request failed");
  return res.json();
}

export const getChampions = () => get("/api/champions");
