import { Router } from "express";
import { getChampions, getChampionById } from "../controllers/champion.js";
import validateId from "../middleware/validateId.js";

const router = Router();

// define routes
router.get("/", getChampions);
router.get("/:id", validateId, getChampionById);

export default router;
