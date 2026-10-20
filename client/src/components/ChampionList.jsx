import { useEffect, useState } from "react";
import { getChampions } from "../api/index.js";

function ChampionList() {
  const [champions, setChampions] = useState([]);
  const [costFilter, setCostFilter] = useState("all");
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

  const visible =
    costFilter === "all"
      ? champions
      : champions.filter((c) => c.cost === Number(costFilter));

  return (
    <div>
      <select
        value={costFilter}
        onChange={(e) => setCostFilter(e.target.value)}
      >
        <option value="all">All costs</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <ul>
        {visible.map((c) => (
          <li key={c.id}>
            {c.name} (cost {c.cost})
            <span style={{ marginLeft: 8 }}>
              {c.traits.map((t) => (
                <span key={t.id} style={{ marginRight: 8 }}>
                  {t.name}
                </span>
              ))}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChampionList;
