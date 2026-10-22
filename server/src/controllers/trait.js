import pool from "../db.js";

// get traits
export const getTraits = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, api_name, name FROM traits ORDER BY name",
    );

    res.json(result.rows);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "failed to fetch traits" });
  }
};
