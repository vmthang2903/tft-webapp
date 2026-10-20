import express from "express";
import cors from "cors";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import logger from "./middleware/logger.js";
import championsRouter from "./routes/champion.js";
import traitsRouter from "./routes/trait.js";

const app = express();

app.use(cors());

// logger middleware
app.use(logger);

// allow server to read json from req body
app.use(express.json());

// champions api
app.use("/api/champions", championsRouter);

// traits api
app.use("/api/traits", traitsRouter);

// health check api
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use(notFound);
app.use(errorHandler);

export default app;
