import pool from "../db.js";

export const getChampions = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT c.id, c.api_name, c.name, c.cost, c.set_number,
          COALESCE(
            json_agg(json_build_object('id', t.id, 'name', t.name) ORDER BY t.name)
              FILTER (WHERE t.id IS NOT NULL),
            '[]'
          ) AS traits
        FROM champions c
        LEFT JOIN champion_traits ct ON ct.champion_id = c.id
        LEFT JOIN traits t ON t.id = ct.trait_id
        GROUP BY c.id
        ORDER BY c.cost, c.name`,
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch champions" });
  }
};

export const getChampionById = async (req, res) => {
  try {
    const id = req.validId;
    const result = await pool.query("SELECT * FROM champions WHERE id = $1", [
      id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Champion not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
