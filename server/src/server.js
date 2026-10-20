import app from "./app.js";
import "dotenv/config";

const PORT = process.env.PORT || 3001;

console.log(PORT);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
