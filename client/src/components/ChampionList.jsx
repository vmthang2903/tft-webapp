import { useEffect, useState } from "react";
import { getChampions } from "../api/index.js";

function ChampionList() {
  const [champions, setChampions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getChampions()
      .then((data) => setChampions(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {champions.map((c) => (
        <li key={c.id}>
          {c.name} (cost {c.cost})
        </li>
      ))}
    </ul>
  );
}

export default ChampionList;
